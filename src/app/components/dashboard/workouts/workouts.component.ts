import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from "../../header/header.component";
import {HttpClient} from "@angular/common/http";
import {WorkoutSchemaModel} from "./models/workout-schema.model";
import {NgForOf, NgIf} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-workouts',
  standalone: true,
  imports: [
    HeaderComponent,
    NgForOf,
    NgIf
  ],
  templateUrl: './workouts.component.html',
  styleUrl: './workouts.component.css'
})
export class WorkoutsComponent implements OnInit{

  workoutsSchema: WorkoutSchemaModel[] = [];
  showWorkoutExercises: boolean = false;
  workoutSchema: WorkoutSchemaModel  = new WorkoutSchemaModel();

  constructor(private http: HttpClient, private router: Router) {

  }

  ngOnInit() {
    const url = 'http://localhost:5213/workouts-schema';

    this.http.get<WorkoutSchemaModel[]>(url)
      .subscribe(
        (x) => {
          this.workoutsSchema = x;
        })
  }

  onWorkoutClick(index: number) {
    this.showWorkoutExercises =!this.showWorkoutExercises;
    this.workoutSchema = this.workoutsSchema[index];
    console.log(this.workoutSchema);
    console.log(this.workoutSchema.exercisesId);
  }


  onTrainClick(name: string) {
    this.router.navigate(['workout'])
  }
}
