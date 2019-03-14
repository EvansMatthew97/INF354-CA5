import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private BASE_URL = 'http://localhost:63802/api/Pets';
  constructor(
    private http: HttpClient
  ) { }

  public getProducts(): Observable<Product[]> {
    return (this.http.get(`${this.BASE_URL}/listDetailedProducts`) as Observable<Product[]>)
  }

  public addProduct(product: {
    name: string;
    price: number;
    categoryId: number;
    supplierId: number;
  }): Observable<any> {
    return (this.http.get(
      `${this.BASE_URL}/addProduct?${Object.keys(product).map(key => `${key}=${encodeURIComponent(product[key])}`).join('&')}`
    ) as any);
  }
}

export interface Product {
  id: number;
  name: string;
  price: number;
  category: Category;
  supplier: Supplier;
}

export interface Category {
  id: number;
  name: string;
}

export interface Supplier {
  id: number;
  name: string;
  email: string;
  phone: string;
}
