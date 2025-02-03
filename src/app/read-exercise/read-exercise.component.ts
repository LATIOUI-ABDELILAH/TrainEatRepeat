import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {HeaderComponent} from "../header/header.component";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-read-exercise',
  standalone: true,
  imports: [
    HeaderComponent,
    RouterLink,
    NgIf,
    NgForOf
  ],
  templateUrl: './read-exercise.component.html',
  styleUrl: './read-exercise.component.css'
})
export class ReadExerciseComponent implements OnInit{
  public exercise: any;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.http.get(`http://localhost:3000/api/exercise/${id}`).subscribe((data) => {
        this.exercise = data;
      });
    }
  }
}
