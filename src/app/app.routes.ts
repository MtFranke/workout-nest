import { Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";
import {authGuard} from "./guards/auth.can-activate";
import {WorkoutsComponent} from "./components/dashboard/workouts/workouts.component";
import {WorkoutComponent} from "./components/dashboard/workouts/workout/workout.component";
import {LandingPageComponent} from "./components/landing-page/landing-page.component";
import {NewWorkoutComponent} from "./components/dashboard/workouts/new-workout/new-workout.component";
import {WorkoutSummaryComponent} from "./components/dashboard/workouts/workout-summary/workout-summary.component";

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'new-workout', component: NewWorkoutComponent, canActivate: [authGuard] },
  { path: 'workout/:guid', component: WorkoutComponent, canActivate: [authGuard] },
  { path: 'workout-summary/:guid', component: WorkoutSummaryComponent, canActivate: [authGuard] },
  { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page

];
