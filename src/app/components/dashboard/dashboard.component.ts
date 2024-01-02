import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {LanguageComponent} from "../landing-page/header/language/language.component";


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    LanguageComponent

  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(private router: Router) {

  }

  onWorkoutsClick() {
      this.router.navigate(['workouts']);

  }
}
