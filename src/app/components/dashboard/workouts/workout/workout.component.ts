import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {WorkoutSchemaModel} from "../models/workout-schema.model";
import {ExerciseModel} from "../models/exercise.model";

@Component({
  selector: 'app-workout',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './workout.component.html',
  styleUrl: './workout.component.css'
})
export class WorkoutComponent {

  guid: string | null = "";
  finished: number = 0;
  workout: WorkoutSchemaModel = new WorkoutSchemaModel();
  exercises: ExerciseModel[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.guid = this.route.snapshot.paramMap.get('guid');
    this.http.get<WorkoutSchemaModel>('http://localhost:5213/workouts-schema/' + this.guid)
      .subscribe(data => {
        console.log(data);
        this.workout = data;
        console.log(this.workout);
      });
     this.http.get<ExerciseModel[]>('http://localhost:5213/exercises')
       .subscribe(data => {
         this.exercises = data;
       });
  }

  getExerciseName(id: string): string {
    return this.exercises.find(x => x.id === id)?.name ?? "";
  }
}
