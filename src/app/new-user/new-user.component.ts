import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from '../authService/auth-service.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-new-user',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css'],
})
export class NewUserComponent {public profileForm: FormGroup = new FormGroup({
  firstName: new FormControl('', Validators.required),
  lastName: new FormControl('', Validators.required),
  age: new FormControl('', [Validators.required, Validators.min(18)]),
  email: new FormControl('', [Validators.required, Validators.email]),
  password: new FormControl('', [
    Validators.required,
    Validators.minLength(8)
  ]),
  gender: new FormControl('', Validators.required),
  weight: new FormControl('', [Validators.required, Validators.min(30)]),
  height: new FormControl('', [Validators.required, Validators.min(100)]),
  activity: new FormControl('', Validators.required),
  objectif: new FormControl('', Validators.required),
});


  public constructor(private authservice: AuthService, public router: Router, public http: HttpClient) {}

  public isFieldInvalid(field: string): boolean {
    const control = this.profileForm.get(field);
    return !!(control?.touched && control?.invalid);
  }

  public getErrorMessage(field: string, errorType: string = 'required'): boolean {
    const control = this.profileForm.get(field);
    return !!control?.hasError(errorType);
  }

  public onSubmit(): void {
    if (this.profileForm.valid) {
      const { firstName, lastName, age, email, password, gender, weight, height, activity, objectif } = this.profileForm.value;
      const userInfo = {
        name: `${firstName} ${lastName}`,
        password: String(password)
      };

      this.authservice.signin(userInfo.name, userInfo.password).subscribe({
        next: (response) => {
          console.log('Signin successful:', response);
          this.sendUserInformation({
            user: response.user, // Assurez-vous que la réponse contient bien l'utilisateur connecté
            gender,
            weight,
            height,
            age,
            activity,
            objectif,
          }).subscribe({
            next: (infoResponse) => {
              console.log('User information saved:', infoResponse);
              this.router.navigate(['/']);
            },
            error: (err) => {
              console.error('Error saving user information:', err);
            }
          });
        },
        error: (err) => {
          console.error('Signin error:', err);
        }
      });
    }
  }

  public sendUserInformation(userInfo: any): Observable<any> {
    return this.http.post('http://localhost:3000/api/informations', userInfo, { withCredentials: true });
  }
}
