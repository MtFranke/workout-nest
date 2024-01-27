import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {NgForOf} from "@angular/common";
import {WorkoutsComponent} from "./workouts/workouts.component";
import {NavigationComponent} from "../navigation/navigation.component";
import {FeedComponent} from "./feed/feed.component";


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NgForOf,
    WorkoutsComponent,
    NavigationComponent,
    FeedComponent

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
