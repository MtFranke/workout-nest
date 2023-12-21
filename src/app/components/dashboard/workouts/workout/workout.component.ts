import { Component } from '@angular/core';
import {HeaderComponent} from "../../../header/header.component";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-workout',
  standalone: true,
  imports: [
    HeaderComponent,
    NgForOf
  ],
  templateUrl: './workout.component.html',
  styleUrl: './workout.component.css'
})
export class WorkoutComponent {

}
