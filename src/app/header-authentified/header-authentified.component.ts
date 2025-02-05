import { Component, OnInit } from '@angular/core';
import { AuthService } from "../authService/auth-service.service";
import {Router, RouterLink} from "@angular/router";
import { NgIf } from "@angular/common";
import { NavigationEnd } from "@angular/router";
import { filter } from "rxjs/operators";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-header-authentified',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    RouterLink
  ],
  templateUrl: './header-authentified.component.html',
  styleUrls: ['./header-authentified.component.css']
})
export class HeaderAuthentifiedComponent implements OnInit {
  public user: any = null;
  public searchQueryRecipe: string = '';
  public searchQueryExercise: string = '';
  public isDropdownOpen = false;
  public isSearchDropdownOpen = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.isLoggedIn().subscribe(user => {
      this.user = user;
    });
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.authService.getUser().subscribe(user => {
        this.user = user;
        console.log(user.name);
      });
    });
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  toggleSearchDropdown() {
    this.isSearchDropdownOpen = !this.isSearchDropdownOpen;
  }

  logoutAndRedirect() {
    this.authService.logout().subscribe(() => {
      this.user = null;
      this.router.navigate(['/home']);
    });
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
