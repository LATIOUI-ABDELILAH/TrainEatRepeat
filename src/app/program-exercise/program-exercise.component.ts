import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { NgForOf } from "@angular/common";
import { AuthService } from "../authService/auth-service.service";
import {HeaderAuthentifiedComponent} from "../header-authentified/header-authentified.component";
import {HeaderComponent} from "../header/header.component";

@Component({
  selector: 'app-program-exercise',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,
    HeaderAuthentifiedComponent,
    HeaderComponent
  ],
  templateUrl: './program-exercise.component.html',
  styleUrls: ['./program-exercise.component.css']
})
export class ProgramExerciseComponent implements OnInit {
  public exercises: any[] = []; // Liste des exercices
  public user: any = null;
  public type: string | null = null;
  public type2: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe({
      next: (userData) => {
        this.user = userData;
        console.log("User JSON:", this.user);

        this.type = this.route.snapshot.paramMap.get('type');
        this.type2 = this.route.snapshot.paramMap.get('type2');

        if (this.user?.name && this.type && this.type2) {
          this.fetchProgrammes();
        } else {
          console.error("Données utilisateur ou paramètres URL manquants");
        }
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
    this.http.get<any>(`http://localhost:3000/ProgramExercise/${this.user.name}/${this.type}/${this.type2}`, { withCredentials: true })
      .subscribe({
        next: (response) => {
          if (Array.isArray(response)) {
            this.exercises = response;
          } else if (response.results) {
            this.exercises = response.results;
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
