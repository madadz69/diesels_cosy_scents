import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private http: HttpClient) { }

  // Create the service URL placeholder
  private serviceUrl = 'http://localhost:8080';

  // hit the endpoint and get the products
  getData(): Observable<Product[]> {
    const data = this.http.get<Product[]>(this.serviceUrl + "/products");
    return data;
  }


}
