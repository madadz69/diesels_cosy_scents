import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartItem, CartService, Product } from './cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  private readonly cartService = inject(CartService);

  protected readonly cart$ = this.cartService.cart$;
  protected readonly total$ = this.cartService.total$;

  protected checkoutMessage = '';
  protected checkoutStatus: 'idle' | 'submitting' | 'success' | 'error' = 'idle';

  protected add(product: Product): void {
    this.cartService.add(product);
  }

  protected decrement(productId: string): void {
    this.cartService.decrement(productId);
  }

  protected remove(productId: string): void {
    this.cartService.remove(productId);
  }

  protected checkout(): void {
    this.checkoutStatus = 'submitting';
    this.checkoutMessage = '';

    this.cartService
      .checkout({
        customerEmail: 'customer@example.com',
        shippingAddress: '123 Cosy Crescent, Candleford',
        note: 'Leave the parcel in the porch.'
      })
      .subscribe({
        next: (confirmation) => {
          this.checkoutStatus = 'success';
          this.checkoutMessage =
            confirmation.message || `Order ${confirmation.orderId} confirmed.`;
        },
        error: (error: Error) => {
          this.checkoutStatus = 'error';
          this.checkoutMessage = error?.message ?? 'Checkout failed. Please try again.';
        }
      });
  }

  protected trackByCartItem(_index: number, item: CartItem): string {
    return item.product.id;
  }
}
