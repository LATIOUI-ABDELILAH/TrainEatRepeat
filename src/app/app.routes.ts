import { Routes } from '@angular/router';


import {IndexComponent} from "./index/index.component";
import {NewUserComponent} from "./new-user/new-user.component";
import {SearchRecipeComponent} from "./search-recipe/search-recipe.component";
import {ReadRecipeComponent} from "./read-recipe/read-recipe.component";
import {SearchExerciseComponent} from "./search-exercise/search-exercise.component";
import {ReadExerciseComponent} from "./read-exercise/read-exercise.component";

export const routes: Routes = [
  {
    path: 'index',
    component: IndexComponent,
  },
  { path: 'new-user', component: NewUserComponent },
  { path: 'search_recipe', component: SearchRecipeComponent },
  { path: 'search_exercise', component: SearchExerciseComponent },
  { path: 'read/:id', component: ReadRecipeComponent },
  { path: 'read_exercise/:id', component: ReadExerciseComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full'}, // redirige vers l'url app les url vide
  { path: '**', component: IndexComponent} // redirige vers RouteComponent les url qui ne sont pas définis ici
];
