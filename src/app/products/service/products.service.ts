import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse, HttpStatusCode } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private http: HttpClient) { }

  // Create the service URL placeholder
  serviceUrl = "http://localhost:8080";
  

  /**
   * Get all products
   * @returns {Observable<Product[]>} Observable of product array
   */
  getData(): Observable<Product[]> {
    const data = this.http.get<Product[]>(this.serviceUrl + "/products");
    return data;
  }

  /**
   * Search for products
   * @param {string} searchTerm - Term user is searching
   * @returns {Observable<Product[], HttpStatusCode>} Observable of product array and status
   */
  searchProduct(searchTerm: string): Observable<Product[]> {
    const params = new HttpParams().set('q', searchTerm);
    return this.http.get<Product[]>(`${this.serviceUrl}/products/search`, { params });
  }

  /**
   * Delete the product - ADMIN ONLY
   * @param id - the product ID to delete
   * @returns {Observable<void>} void response.
   */
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.serviceUrl}/products/${id}`);
  }
}
