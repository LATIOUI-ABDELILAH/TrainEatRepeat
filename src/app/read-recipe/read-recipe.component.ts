import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {NgForOf} from "@angular/common";
import {HeaderComponent} from "../header/header.component";

@Component({
  selector: 'app-read-recipe',
  templateUrl: './read-recipe.component.html',
  standalone: true,
  imports: [
    NgForOf,
    HeaderComponent
  ],
  styleUrls: ['./read-recipe.component.css']
})
export class ReadRecipeComponent implements OnInit {
  public recipe: any;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.http.get(`http://localhost:3000/api/recipe/${id}`).subscribe((data) => {
        this.recipe = data;
      });
    }
  }
}
