import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Product } from '../models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor() { }
  
  products: Product[]=[];
  private httpClient = inject(HttpClient);
  private apiCartUrl= environment.api_Url+'/cart';
  private apiCheckOutUrl= environment.api_Url+'/checkout';
  
  getCart():Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.apiCartUrl);
  }
  
  addToCart(product: Product):Observable<Product> {
    return this.httpClient.post<Product>(this.apiCartUrl,product);
  }
  
  checkout(products: Product[]): Observable<void> { 
    return this.httpClient.post<void>(this.apiCheckOutUrl,products);
  }
  
  updateCart(product: Product): Observable<Product> {
    return this.httpClient.put<Product>(`${this.apiCartUrl}/${product.id}`,product);
  }

  deleteCart(): Observable <void> {
    return this.httpClient.delete<void>(this.apiCartUrl);
  }
}
