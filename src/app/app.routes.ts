import { Routes } from '@angular/router';


import {IndexComponent} from "./index/index.component";
import {NewUserComponent} from "./new-user/new-user.component";
import {SearchRecipeComponent} from "./search-recipe/search-recipe.component";
import {ReadRecipeComponent} from "./read-recipe/read-recipe.component";
import {SearchExerciseComponent} from "./search-exercise/search-exercise.component";
import {ReadExerciseComponent} from "./read-exercise/read-exercise.component";
import {IndexAuthentifiedComponent} from "./index-authentified/index-authentified.component";
import {LoginComponent} from "./login/login.component";
import {ProgramRecipeComponent} from "./program-recipe/program-recipe.component";
import {ProgramExerciseComponent} from "./program-exercise/program-exercise.component";
import {ExerciseTypeComponent} from "./exercise-type/exercise-type.component";

export const routes: Routes = [
  {
    path: 'index',
    component: IndexComponent,
  },
  { path: 'new-user', component: NewUserComponent },
  { path: 'search_recipe', component: SearchRecipeComponent },
  { path: 'search_exercise', component: SearchExerciseComponent },
  { path: 'indexAuthentified', component: IndexAuthentifiedComponent },
  { path: 'login', component: LoginComponent },
  { path: 'ProgramRecipe', component: ProgramRecipeComponent },
  { path: 'read/:id', component: ReadRecipeComponent },
  { path: 'read_exercise/:id', component: ReadExerciseComponent },
  { path: 'ProgramExercise/:type/:type2', component: ProgramExerciseComponent },
  { path: 'ExerciseType', component: ExerciseTypeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full'}, // redirige vers l'url app les url vide
  { path: '**', component: IndexComponent} // redirige vers RouteComponent les url qui ne sont pas définis ici
];
