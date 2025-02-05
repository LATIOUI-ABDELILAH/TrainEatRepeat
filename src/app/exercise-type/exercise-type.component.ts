import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {HeaderAuthentifiedComponent} from "../header-authentified/header-authentified.component";

@Component({
  selector: 'app-exercise-type',
  standalone: true,
  imports: [
    RouterLink,
    HeaderAuthentifiedComponent
  ],
  templateUrl: './exercise-type.component.html',
  styleUrl: './exercise-type.component.css'
})
export class ExerciseTypeComponent {

}
