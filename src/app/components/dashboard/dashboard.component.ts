import { Component } from '@angular/core';
import {Router} from "@angular/router";


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [

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
