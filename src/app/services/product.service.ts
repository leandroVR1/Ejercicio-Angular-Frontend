import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from '../interfaces/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  addProduct(value: any) {
    throw new Error('Method not implemented.');
  }

  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/products/'
   }

   getProducts(): Observable<Product[]> {
   /* const token = localStorage.getItem('token')
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`)
    return this.http.get<Product[]>(`${this.myAppUrl}${this.myApiUrl}`, {headers: headers});
   */
    return this.http.get<Product[]>(`${this.myAppUrl}${this.myApiUrl}`);
    
  }

  createProduct(product: Product): Observable<void>{
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, product);


  }

  deleteProduct(id: number) : Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  getProduct(id: number): Observable<Product>{
    return this.http.get<Product>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  updateProduct(id: number, product: Product): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, product);
  }
  
  

}
