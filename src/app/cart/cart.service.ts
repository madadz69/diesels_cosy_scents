import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, tap } from 'rxjs/operators';

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CheckoutDetails {
  customerEmail: string;
  shippingAddress: string;
  note?: string;
}

export interface CheckoutRequest extends CheckoutDetails {
  items: Array<{
    productId: string;
    quantity: number;
    price: number;
  }>;
  total: number;
}

export interface OrderConfirmation {
  orderId: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly storageKey = 'diesels-cosy-scents-cart';
  private readonly cartSubject = new BehaviorSubject<CartItem[]>(this.restoreCart());
  readonly cart$ = this.cartSubject.asObservable();
  readonly total$ = this.cart$.pipe(
    map(items => items.reduce((sum, item) => sum + item.product.price * item.quantity, 0))
  );
  readonly itemCount$ = this.cart$.pipe(
    map(items => items.reduce((sum, item) => sum + item.quantity, 0))
  );

  private readonly ordersEndpoint = '/api/orders';

  constructor(private readonly http: HttpClient) {}

  add(product: Product, quantity = 1): void {
    const items = this.cloneCart();
    const target = items.find(item => item.product.id === product.id);

    if (target) {
      target.quantity += quantity;
    } else {
      items.push({ product, quantity });
    }

    this.updateCart(items);
  }

  decrement(productId: string): void {
    const items = this.cloneCart()
      .map(item =>
        item.product.id === productId ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter(item => item.quantity > 0);

    this.updateCart(items);
  }

  remove(productId: string): void {
    const items = this.cloneCart().filter(item => item.product.id !== productId);
    this.updateCart(items);
  }

  clear(): void {
    this.updateCart([]);
  }

  checkout(details: CheckoutDetails): Observable<OrderConfirmation> {
    const snapshot = this.cartSubject.value;

    if (!snapshot.length) {
      return throwError(() => new Error('Your basket is empty.'));
    }

    const payload: CheckoutRequest = {
      ...details,
      items: snapshot.map(item => ({
        productId: item.product.id,
        quantity: item.quantity,
        price: item.product.price
      })),
      total: snapshot.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
    };

    return this.http.post<OrderConfirmation>(this.ordersEndpoint, payload).pipe(
      tap(() => this.clear())
    );
  }

  private updateCart(items: CartItem[]): void {
    this.cartSubject.next(items);
    this.persistCart(items);
  }

  private cloneCart(): CartItem[] {
    return this.cartSubject.value.map(item => ({ ...item }));
  }

  private restoreCart(): CartItem[] {
    if (typeof window === 'undefined') {
      return [];
    }

    try {
      const raw = window.localStorage.getItem(this.storageKey);
      return raw ? (JSON.parse(raw) as CartItem[]) : [];
    } catch {
      return [];
    }
  }

  private persistCart(items: CartItem[]): void {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      window.localStorage.setItem(this.storageKey, JSON.stringify(items));
    } catch {
      // Ignore storage errors (e.g., quota exceeded).
    }
  }
}
