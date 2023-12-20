import { Component } from '@angular/core';
import {HeaderComponent} from "../../header/header.component";

@Component({
  selector: 'app-workouts',
  standalone: true,
  imports: [
    HeaderComponent
  ],
  templateUrl: './workouts.component.html',
  styleUrl: './workouts.component.css'
})
export class WorkoutsComponent {

}
