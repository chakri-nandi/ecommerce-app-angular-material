import { Component, inject, OnInit} from '@angular/core';
import { MatCard, MatCardModule } from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import { Product } from '../../models/product';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [MatCardModule,MatListModule,CommonModule, MatButton],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems: Product[] = [];
  private cartService= inject(CartService);
  
  ngOnInit(): void {
    this.cartService.getCart().subscribe(data=>{
      if(data){
        this.cartItems = data;
      } else {
        console.log('No items in the cart.');
      }
    });
  }
  clearCart() {
    this.cartService.deleteCart().subscribe();
  }
  checkout() {
    this.cartService.checkout(this.cartItems).subscribe();
  }
  
  getTotalPrice():number {
    return this.cartItems.reduce((total, item) => total + item.price, 0.0);
  }
}

