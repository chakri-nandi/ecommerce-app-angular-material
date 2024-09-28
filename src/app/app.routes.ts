import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: '',title:'Home', redirectTo: 'products', pathMatch: 'full'},
    {path: 'products', loadChildren: () => import('./products/product-list/product-list.component').then(m => m.ProductListComponent)},
];
