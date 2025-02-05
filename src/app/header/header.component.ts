import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../authService/auth-service.service';
import {Router, NavigationEnd, RouterLink} from '@angular/router';
import { filter } from 'rxjs/operators';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  public user: any = null;
  public searchQueryRecipe: string = '';
  public searchQueryExercise: string = '';
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.isLoggedIn().subscribe(user => {
      this.user = user;
    });
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.authService.isLoggedIn().subscribe(user => {
        this.user = user;
      });
    });
  }
  isDropdownOpen = false;
  isSearchDropdownOpen = false;
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  toggleSearchDropdown() {
    this.isSearchDropdownOpen = !this.isSearchDropdownOpen;
  }
  onSubmitSearchRecipe() {
    if (this.searchQueryRecipe) {
      this.router.navigate(['/search_recipe'], { queryParams: { query: this.searchQueryRecipe } });
    }
  }

  onSubmitSearchExercise() {
    if (this.searchQueryExercise) {
      this.router.navigate(['/search_exercise'], { queryParams: { query: this.searchQueryExercise } });
    }
  }

}
