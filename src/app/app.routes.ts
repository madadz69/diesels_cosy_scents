import { Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { WhoIsDieselComponent } from './who-is-diesel/who-is-diesel.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'about', component: AboutUsComponent },
    { path: 'who-is-diesel', component: WhoIsDieselComponent },
    { path: 'contact-us', component: ContactUsComponent }
];
