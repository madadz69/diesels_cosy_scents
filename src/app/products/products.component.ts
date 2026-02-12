import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Product } from './models/product.model'
import { ProductsService } from './service/products.service';
import { CartService } from '../cart/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {

  constructor(private productsService: ProductsService) {}

  protected readonly dieselHomeVideo = 'assets/diesel-the-cat/diesel-with-product.HEIC';
  products: Product[] = [];
  
  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productsService.getData().subscribe({
      next: (data) => {
        this.products = data;
        console.log(data);
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      }
    });
  }

  searchProducts(query: string) {
    this.productsService.searchProduct(query).pipe(take(1)).subscribe(data => {
        this.products = data;
        console.log(data);
      }
    )
  }

  private readonly cartService = inject(CartService);
  private readonly snackBar = inject(MatSnackBar);
  private readonly router = inject(Router);
  
  protected add(product: Product): void {
    const snackbarMessage = `${product.name} added to the basket`;
    this.cartService.add(product);

    const snackBarRef = this.snackBar.open(snackbarMessage, 'View Basket', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['dark-snackbar']
    });
    
    snackBarRef.onAction().subscribe(() => {
      console.log('Action button clicked. Navigating to the basket....');
      this.router.navigate(['/cart']);
    })
  }

  protected trackByProductId(_index: number, product: Product): number {
    return product.id;
  }
}
