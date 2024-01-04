import {Component, OnInit} from '@angular/core';
import {LanguageComponent} from "../../../landing-page/header/language/language.component";
import {HttpClient} from "@angular/common/http";
import {ExerciseModel} from "../models/exercise.model";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-new-workout',
  standalone: true,
  imports: [
    LanguageComponent,
    NgForOf
  ],
  templateUrl: './new-workout.component.html',
  styleUrl: './new-workout.component.css'
})
export class NewWorkoutComponent implements OnInit{

  selectedExercises: ExerciseModel[] = [];
  targetedMuscles: string[] = [];
  exercices: ExerciseModel[] = [];
  constructor(private http: HttpClient) { }

  ngOnInit() {
  this.http.get<ExerciseModel[]>('http://localhost:5213/exercises').subscribe(data => {
      this.exercices = data;
      console.log(this.exercices);
    });
  }

  onAddExercise(exercise: ExerciseModel) {
    this.selectedExercises.push(exercise);
     this.checkIfMuscleIsTrained(exercise.primaryMuscleGroup);
  }

  checkIfMuscleIsTrained(muscle: string): boolean {
    if (this.targetedMuscles.indexOf(muscle) === -1) {
      this.targetedMuscles.push(muscle);
      return true;
    } else {
      return false;
    }
  }
}
