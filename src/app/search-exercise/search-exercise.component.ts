import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { NgForOf, NgIf } from "@angular/common";

@Component({
  selector: 'app-search-exercise',
  templateUrl: './search-exercise.component.html',
  standalone: true,
  imports: [
    HeaderComponent,
    RouterLink,
    NgIf,
    NgForOf
  ],
  styleUrls: ['./search-exercise.component.css']
})
export class SearchExerciseComponent implements OnInit {
  searchResults: any = {
    num_found: 0,
    page: 1,
    num_pages: 1,
    informationss: [],
    query: '',
    next_page: null
  };

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const query = params['query'] || '';
      const page = params['page'] || 1;
      this.fetchSearchResults(query, page);
    });
  }

  fetchSearchResults(query: string, page: number) {
    this.http.get<any>(`http://localhost:3000/api/exercises?query=${query}&page=${page}`)
      .subscribe(response => {
        this.searchResults = response;
      });
  }
}
