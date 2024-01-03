import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {WorkoutSchemaModel} from "./models/workout-schema.model";
import {NgForOf, NgIf} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-workouts',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './workouts.component.html',
  styleUrl: './workouts.component.css'
})
export class WorkoutsComponent implements OnInit{
  workouts:WorkoutSchemaModel [] = [];


  constructor(private http: HttpClient, private router: Router) {

  }

  ngOnInit() {
    this.http
      .get<WorkoutSchemaModel[]>('http://localhost:5213/workouts-schema')
      .subscribe((x)=> {
        console.log(x);
        this.workouts = x;
      })
  }

  onWorkoutClick(index: number): void{
    const workoutId = this.workouts[index].id;
    this.router.navigate(['workout', workoutId] );
  }
}
