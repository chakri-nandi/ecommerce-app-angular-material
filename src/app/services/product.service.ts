import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';
import { Observable } from 'rxjs';

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
}
