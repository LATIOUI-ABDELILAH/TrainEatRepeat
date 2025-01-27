import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:3000/api'; // Ton URL de l'API backend Express

  constructor(private http: HttpClient) { }

  // Exemple de méthode pour se connecter à l'API
  getUser(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user`);
  }

  // Exemple de méthode pour obtenir les calories
  getCalories(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/calories`);
  }

  // Exemple de méthode pour récupérer les recettes
  getRecipes(query: string, page: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/recipes?query=${query}&page=${page}`);
  }

  // Exemple de méthode pour récupérer un exercice spécifique
  getExercise(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/exercise/${id}`);
  }

  // Exemple de méthode pour la connexion d'un utilisateur
  login(name: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { name, password });
  }

  // Exemple de méthode pour la déconnexion
  logout(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/logout`, {});
  }
}
