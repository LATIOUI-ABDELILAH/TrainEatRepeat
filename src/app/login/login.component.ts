import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from "../authService/auth-service.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public loginForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    password: new FormControl ('', Validators.required),
  });
  public errorMessage: string = '';
  public userName: string='';

  constructor(private authService: AuthService, private router: Router) {
  }

  login() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value.name, this.loginForm.value.password).subscribe({
        next: () => {
          this.router.navigate(['indexAuthentified']); // Redirection après connexion réussie
          this.userName = this.authService.user;
        },
        error: (err) => {
          this.errorMessage = err.message;
        }
      });
    }
  }
}
