import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Options, Product } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private HttpClient: HttpClient) {}

  get<T>(url: string, options: Options): Observable<T> {
    return this.HttpClient.get<T>(url, options) as Observable<T>;
  }

  //=== post ===
  post<T>(url: string, body: Product, options: Options): Observable<T> {
    return this.HttpClient.post<T>(url, body, options) as Observable<T>;
  }

  //=== update ===
  put<T>(id: string, body: Product, options: Options): Observable<T> {
    return this.HttpClient.put<T>(id, body, options) as Observable<T>;
  }

  //=== delete ===
  delete<T>(url: string, options: Options): Observable<T> {
    return this.HttpClient.delete<T>(url, options) as Observable<T>;
  }
}
