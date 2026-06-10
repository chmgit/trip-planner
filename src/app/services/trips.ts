import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Trip {
  id: string;
  name: string;
  destination: string;
  date: string;
  price: number;
  description: string;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class Trips {
  private apiUrl = 'http://localhost:3000/trips';

  constructor(private http: HttpClient) {}

  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.apiUrl);
  }

  getTripById(id: string): Observable<Trip> {
    return this.http.get<Trip>(`${this.apiUrl}/${id}`);
  }
}