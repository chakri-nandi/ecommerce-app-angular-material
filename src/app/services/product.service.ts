import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor() { }
  
  private httpClient = inject(HttpClient);
  private api_Url= environment.api_Url+'/products';
  
  getAllProducts() : Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.api_Url);
  }

  searchProducts(searchTerm: string, products: Product[]): Observable<Product[]> {
    if (!searchTerm.trim()) {
      return of(products);
    }
    
    const filteredProducts = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    return of(filteredProducts); 
  }

  sortProducts(sortBy: string,filteredProducts :Product[]): Observable<Product[]> {
    const sortFunctions = new Map<string, (a: Product, b: Product) => number>([
      ['PriceLowToHigh', (a, b) => a.price - b.price],
      ['PriceHighToLow', (a, b) => b.price - a.price],
      ['AToZ', (a, b) => a.name.localeCompare(b.name)],
      ['ZToA', (a, b) => b.name.localeCompare(a.name)]
    ]);

    const sortFunction = sortFunctions.get(sortBy) || (() => 0);
    return of(filteredProducts.sort(sortFunction));
  }
  
}
