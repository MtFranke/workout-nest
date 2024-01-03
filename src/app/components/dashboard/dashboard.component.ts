import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {LanguageComponent} from "../landing-page/header/language/language.component";
import {HttpClient} from "@angular/common/http";
import {NgForOf} from "@angular/common";
import {WorkoutsComponent} from "./workouts/workouts.component";


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    LanguageComponent,
    NgForOf,
    WorkoutsComponent

  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent{
  constructor(private router: Router, private http: HttpClient) {

  }

  onNewWorkoutClick() {
    this.router.navigate(['new-workout']);
  }
}
