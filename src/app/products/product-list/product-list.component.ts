import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { MatCardModule } from '@angular/material/card'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [MatCardModule,CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  private productService = inject(ProductService);
  products: Product[]=[];

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(products => {
      if(products) {
      this.products=products;
      } else {
      console.log("No products found");
     }
    })
  }
}
