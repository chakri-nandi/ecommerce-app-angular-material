import { Component, OnInit, inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { MatCardModule } from '@angular/material/card'; 
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CartService } from '../../services/cart.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    FlexLayoutModule,
    CommonModule,
    MatCardModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  private cartService = inject(CartService);
  private productService = inject(ProductService);
  private snackBar = inject(MatSnackBar);

  products: Product[] = [];
  filteredProducts: Product[] = [];
  sortOrder: string = '';

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        if (products && products.length > 0) {
          this.products = products;
          this.filteredProducts = [...products];
        } else {
          this.handleNoProducts();
        }
      },
      error: (error) => {
        console.error("Error fetching products", error);
      }
    });
  }

  handleNoProducts(): void {
    console.log("No products found");
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product).subscribe({
      next: () => {
        this.snackBar.open('Product added successfully', '', {
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        });
      },
      error: (error) => {
        console.error('Error while adding product', error);
      }
    });
  }

  sortProducts(sortBy: string): void {
    this.sortOrder = sortBy;
    this.productService.sortProducts(sortBy,this.products).subscribe((filteredProducts) =>{
      this.filteredProducts = filteredProducts;
    });
  }

  searchProducts(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value;
    this.productService.searchProducts(searchTerm, this.products).subscribe((filteredProducts) =>{
      this.filteredProducts = filteredProducts;
    });
    this.sortProducts(this.sortOrder);
  }
}
