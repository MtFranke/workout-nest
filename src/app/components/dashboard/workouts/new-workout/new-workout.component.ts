import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ExerciseModel} from "../models/exercise.model";
import {NgForOf, NgIf} from "@angular/common";
import {WorkoutSchemaModel} from "../models/workout-schema.model";
import {Router} from "@angular/router";
import {NavigationComponent} from "../../../navigation/navigation.component";
import {environment} from "../../../../../environment/environment";

@Component({
  selector: 'app-new-workout',
  standalone: true,
  imports: [
    NgForOf,
    NavigationComponent,
    NgIf
  ],
  templateUrl: './new-workout.component.html',
  styleUrl: './new-workout.component.css'
})
export class NewWorkoutComponent implements OnInit{

  // @ts-ignore
  @ViewChild('workout_name', { static: false }) workoutNameEl: ElementRef;

  selectedExercises: ExerciseModel[] = [];
  targetedMuscles: string[] = [];
  exercices: ExerciseModel[] = [];

  targetedMusclesVisible: boolean = false;
  exercisesVisible: boolean = false;
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  this.http.get<ExerciseModel[]>(`${environment.workoutNestApiUrl}/exercises`).subscribe(data => {
      this.exercices = data;
      console.log(this.exercices);
    });
  }

  onAddExercise(exercise: ExerciseModel) {
    this.selectedExercises.push(exercise);
     this.checkIfMuscleIsTrained(exercise.primaryMuscleGroup);
     this.targetedMusclesVisible = true;
     this.exercisesVisible = true;
  }

  checkIfMuscleIsTrained(muscle: string): boolean {
    if (this.targetedMuscles.indexOf(muscle) === -1) {
      this.targetedMuscles.push(muscle);
      return true;
    } else {
      return false;
    }
  }

  onSaveWorkout() {

    let workoutSchema = new WorkoutSchemaModel();
    workoutSchema.name = this.workoutNameEl.nativeElement.value;
    workoutSchema.exercisesId = this.selectedExercises.map(x => x.id);
    this.http.post(`${environment.workoutNestApiUrl}/workouts-schema`, workoutSchema).subscribe(data => {
      console.log(data);
      this.router.navigate(['dashboard']);
    });



  }
}
