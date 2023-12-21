import { Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {HomeComponent} from "./components/home/home.component";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";
import {authGuard} from "./guards/auth.can-activate";
import {WorkoutsComponent} from "./components/dashboard/workouts/workouts.component";
import {WorkoutComponent} from "./components/dashboard/workouts/workout/workout.component";

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'workouts', component: WorkoutsComponent, canActivate: [authGuard] },
  { path: 'workout', component: WorkoutComponent, canActivate: [authGuard] },
  { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page

];
