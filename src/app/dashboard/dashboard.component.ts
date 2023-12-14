import { Component } from '@angular/core';
import {WorkoutsComponent} from "./workouts/workouts.component";
import {ExercisesComponent} from "./exercises/exercises.component";
import {FeedComponent} from "./feed/feed.component";
import {JustStartComponent} from "./just-start/just-start.component";
import {HeaderComponent} from "../header/header.component";
import {FooterComponent} from "../footer/footer.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    WorkoutsComponent,
    ExercisesComponent,
    FeedComponent,
    JustStartComponent,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
