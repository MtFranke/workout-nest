import { Component } from '@angular/core';
import {HeaderComponent} from "../header/header.component";
import {Router} from "@angular/router";


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    HeaderComponent
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
