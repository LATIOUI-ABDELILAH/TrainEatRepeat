import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api';
  public user: any = null;

  public constructor(private http: HttpClient) {}


  public signin(name: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/new_user`, { name, password }, { withCredentials: true }).pipe(
      tap(user => this.user = user)
    );
  }
  public login(name: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { name, password }, { withCredentials: true }).pipe(
    tap(user => this.user = user)
  );
  }
  public logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true }).pipe(
    tap(() => this.user = null)
  );
  }
  public getUser(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user`, { withCredentials: true }).pipe(
    tap(user => this.user = user)
  );
  }
  public isLoggedIn(): Observable<any> {
    return this.http.get<{ user: any }>(`${this.apiUrl}/isLoggedIn`, { withCredentials: true }).pipe(
      tap(response => this.user = response.user)
    );
  }
}
