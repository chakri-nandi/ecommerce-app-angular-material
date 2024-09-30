import { Routes } from '@angular/router';
import { CartComponent } from './products/cart/cart.component';
import { ProductListComponent } from './products/product-list/product-list.component';

export const routes: Routes = [
    {path: '',title:'Home', redirectTo: 'products', pathMatch: 'full'},
    {path: 'products', title: 'Products', component: ProductListComponent},
    {path: 'cart', title:'Cart', component: CartComponent}
];
