import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface User {
  id: string;
  name: string;
  password: string;
  fullName: string;
  isAdmin: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private apiUrl = 'http://localhost:3000/users';
  private currentUser: User | null = null;

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl).pipe(
      map(users =>
        users.filter(user =>
          user.name === username && user.password === password
        )
      )
    );
  }

  setCurrentUser(user: User): void {
    this.currentUser = user;
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  logout(): void {
    this.currentUser = null;
  }
}