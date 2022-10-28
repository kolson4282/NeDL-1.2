import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export const BASE_URL = 'https://pokeapi.co/api/v2';

@Injectable({
  providedIn: 'root',
})
export class PokeapiService {
  constructor(private http: HttpClient) {}

  getFromURL<T>(url: string): Observable<T> {
    return this.http.get<T>(url);
  }

  getFromEndpoint<T>(endpoint: string): Observable<T> {
    return this.getFromURL<T>(`${BASE_URL}/${endpoint}`);
  }
}
