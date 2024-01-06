import {Component, ElementRef, ViewChild} from '@angular/core';
import {NgForOf} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {WorkoutSchemaModel} from "../models/workout-schema.model";
import {ExerciseModel} from "../models/exercise.model";
import {WorkedExerciseModel} from "../models/worked-exercise.model";
import {SetModel} from "../models/set.model";
import {WorkoutSchemaTrainingModel} from "../models/workout-schema-training.model";

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

  // @ts-ignore
  @ViewChild('weight', { static: false }) weightEl: ElementRef;
  // @ts-ignore
  @ViewChild('reps', { static: false }) repsEl: ElementRef;


  guid: string | null = "";
  finished: number = 0;
  workout: WorkoutSchemaModel = new WorkoutSchemaModel();
  exercises: ExerciseModel[] = [];
  workedExercisesModel: WorkedExerciseModel[] = [];
  w: WorkoutSchemaTrainingModel[] = [];

  currentExercise: WorkedExerciseModel = new WorkedExerciseModel();
  currentExerciseName: string = ""

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

  onSetFinish() {
    const weight = this.weightEl.nativeElement.value;
    const reps = this.repsEl.nativeElement.value;
    this.currentExercise.set.push(new SetModel(weight, reps));
    console.log(this.currentExercise.set);
  }

  onExerciseSelected(exercise: string) {
    this.currentExercise.exercisesId = exercise;
    this.currentExerciseName = this.getExerciseName(exercise);
    console.log(this.currentExercise)
  }

  onCompleteExercise() {
    this.workedExercisesModel.push(this.currentExercise);
    this.currentExercise = new WorkedExerciseModel();
    this.currentExerciseName = "";
    console.log(this.workedExercisesModel);
  }
}
