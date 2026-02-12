import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private http: HttpClient) { }

  // Create the service URL placeholder
  serviceUrl = "http://localhost:8080";
  
  // hit the endpoint and get the products
  getData(): Observable<Product[]> {
    const data = this.http.get<Product[]>(this.serviceUrl + "/products");
    return data;
  }

  searchProduct(searchTerm: string): Observable<Product[]> {
    const params = new HttpParams().set('q', searchTerm);
    return this.http.get<Product[]>(`${this.serviceUrl}/products/search`, { params });
  }
}
