import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api';
  public user: any = null;
  public userName: any = null;

  public constructor(private http: HttpClient) {}


  public signin(name: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/new_user`, { name, password }, { withCredentials: true }).pipe(
      tap(user => this.user = user)
    );
  }
  login(name: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { name, password }, { withCredentials: true }).pipe(
      tap((response) => {
        this.user = response.user;
        this.userName = response.name;
      }),
      catchError((error) => {
        let errorMsg = 'Une erreur inconnue est survenue.';

        if (error.status === 401) {
          errorMsg = 'Nom d’utilisateur ou mot de passe incorrect.';
        } else if (error.status === 0) {
          errorMsg = 'Impossible de contacter le serveur. Vérifiez votre connexion.';
        }

        return throwError(() => new Error(errorMsg));
      })
    );
  }
  public logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true }).pipe(
    tap(() => this.user = null,
    this.userName = null)
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

  public getClientInfo(): Observable<any> {
    return this.http.get(`${this.apiUrl}/calories`, { withCredentials: true });
  }
}
