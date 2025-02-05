import {Component, OnInit} from '@angular/core';
import {AuthService} from "../authService/auth-service.service";
import {HeaderAuthentifiedComponent} from "../header-authentified/header-authentified.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-index-authentified',
  standalone: true,
  imports: [
    HeaderAuthentifiedComponent,
    RouterLink
  ],
  templateUrl: './index-authentified.component.html',
  styleUrl: './index-authentified.component.css'
})
export class IndexAuthentifiedComponent implements OnInit{
  public userData: any = {};
  private errorMessage: string = '';

  public constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getClientInfo().subscribe({
      next: (data) => {
        this.userData = data;
      },
      error: (error) => {
        this.errorMessage = 'Impossible de récupérer les données du client.';
        console.error(error);
      }
    });
  }
}
