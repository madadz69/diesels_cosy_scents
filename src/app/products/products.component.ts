import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CartService, Product } from '../cart/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

  protected readonly dieselHomeVideo = 'assets/diesel-the-cat/diesel-with-product.HEIC';

  // Mock the products for now!
  protected readonly products: Product[] = [
    {
      id: 'wax-melt-amber',
      name: 'Amber Ember Wax Melt',
      description: 'A cosy blend of amber, tonka, and vanilla that feels like curling up by the fire.',
      price: 6.5,
      imageUrl: 'assets/products/amber-ember.jpg'
    },
    {
      id: 'wax-melt-citrus',
      name: 'Citrus Sunrise Wax Melt',
      description: 'Bright citrus oils balanced with neroli to kick-start slower mornings.',
      price: 6,
      imageUrl: 'assets/products/citrus-sunrise.jpg'
    },
    {
      id: 'wax-melt-lavender',
      name: 'Lavender Drift Wax Melt',
      description: 'Hand-poured lavender, chamomile, and a whisper of cedar to wind down at night.',
      price: 7,
      imageUrl: 'assets/products/lavender-drift.jpg'
    }
  ];

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

  protected trackByProductId(_index: number, product: Product): string {
    return product.id;
  }
}
