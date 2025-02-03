import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import {NgIf} from "@angular/common";
import {AuthService} from "../authService/auth-service.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  public profileForm = new FormGroup({
    lastName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(private authservice: AuthService, private router: Router, private http: HttpClient) {}

  onSubmit() {
    console.log("Submit work");
    if (this.profileForm.valid) {
      console.log("the profileform is valid");
      const { lastName, password} = this.profileForm.value;
      const userInfo = {
        name: String(lastName),
        password: String(password)
      };
      console.log("Calling signin with:", userInfo);
      this.authservice.signin(userInfo.name, userInfo.password).subscribe({
        next: (response) => {
          console.log("Signin successful:", response);
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error("Signin error:", err);
        }
      });

    }

  }

  public sendUserInformation(userInfo: any): Observable<any> {
    return this.http.post('http://localhost:3000/api/informations', userInfo, { withCredentials: true });
  }

}
