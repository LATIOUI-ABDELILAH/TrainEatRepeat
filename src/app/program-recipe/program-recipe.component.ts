import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { NgForOf, NgIf } from "@angular/common";
import { HeaderAuthentifiedComponent } from "../header-authentified/header-authentified.component";
import { HttpClient } from "@angular/common/http";
import { Router, RouterLink } from "@angular/router";
import { AuthService } from "../authService/auth-service.service";

@Component({
  selector: 'app-program-recipe',
  standalone: true,
  imports: [
    HeaderComponent,
    NgForOf,
    NgIf,
    HeaderAuthentifiedComponent,
    RouterLink
  ],
  templateUrl: './program-recipe.component.html',
  styleUrls: ['./program-recipe.component.css']
})
export class ProgramRecipeComponent implements OnInit {
  public recipes: any[] = []; // Liste des recettes
  public user: any = null;

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    // Souscription à l'Observable pour récupérer la valeur de l'utilisateur
    this.authService.getUser().subscribe({
      next: (userData) => {
        this.user = userData;
        console.log("User JSON:", this.user);

        // Une fois l'utilisateur récupéré, appeler fetchProgrammes()
        this.fetchProgrammes();
      },
      error: (error) => {
        console.error("Erreur lors de la récupération de l'utilisateur:", error);
      }
    });
  }

  fetchProgrammes(): void {
    if (!this.user.name) {
      console.error('User ID not found in session storage.');
      return;
    }

    // Faire la requête avec l'ID de l'utilisateur
    this.http.get<any>(`http://localhost:3000/ProgramRecipe/${this.user.name}`, { withCredentials: true })
      .subscribe({
        next: (response) => {
          if (Array.isArray(response)) {
            this.recipes = response;
          } else if (response.results) {
            this.recipes = response.results;
          } else {
            console.error('Aucune recette trouvée dans la réponse');
          }
        },
        error: (error) => {
          console.error('Erreur lors de la récupération des programmes de recettes:', error);
        }
      });
  }
}
