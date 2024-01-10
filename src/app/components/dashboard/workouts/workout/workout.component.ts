import {Component, ElementRef, ViewChild} from '@angular/core';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {WorkoutSchemaModel} from "../models/workout-schema.model";
import {ExerciseModel} from "../models/exercise.model";
import {WorkedExerciseModel} from "../models/worked-exercise.model";
import {SetModel} from "../models/set.model";
import {WorkoutSchemaTrainingModel} from "../models/workout-schema-training.model";
import {WorkoutExerciseModel} from "../models/workout-exercise.model";
import {SaveWorkoutModel} from "../models/save-workout.model";
import {NavigationComponent} from "../../../navigation/navigation.component";

@Component({
  selector: 'app-workout',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    NavigationComponent,
    NgClass
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
  exercises: ExerciseModel[] = [];
  workedExercisesModel: WorkedExerciseModel[] = [];
  w: WorkoutSchemaTrainingModel = new WorkoutSchemaTrainingModel();

  // @ts-ignore
  currentExercise: WorkedExerciseModel = null;
  currentExerciseName: string = ""

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.guid = this.route.snapshot.paramMap.get('guid');
    this.http.get<WorkoutSchemaModel>('http://localhost:5213/workouts-schema/' + this.guid)
      .subscribe(data => {
        console.log(data);
        this.w.name = data.name;
        this.w.id = data.id;
        this.w.workoutExerciseModel = data.exercisesId.map(x => new WorkoutExerciseModel(x));

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
    this.currentExercise.sets.push(new SetModel(weight, reps));
  }

  onExerciseSelected(exercise: string) {
    this.currentExercise = new WorkedExerciseModel();
    this.currentExercise.exercisesId = exercise;
    this.currentExerciseName = this.getExerciseName(exercise);
  }

  onCompleteExercise() {
    this.workedExercisesModel.push(this.currentExercise);

    const foundExercise = this.w.workoutExerciseModel.find(
      (exercise) => exercise.exercisesId === this.currentExercise.exercisesId
    );

    if (foundExercise) {
      foundExercise.completed = true;
      foundExercise.sets = this.currentExercise.sets;
    } else {
      console.error(`Exercise with id ${this.currentExercise.exercisesId} not found.`);
    }
    this.currentExercise = new WorkedExerciseModel();
    this.currentExerciseName = "";
    this.finished++;
    console.log(this.workedExercisesModel);
    console.log(this.w);
  }

  onWorkoutEnd() {
    const body = new SaveWorkoutModel(this.w.name, this.workedExercisesModel);
    let workoutId;
    this.http.post<string>('http://localhost:5213/workout', body).subscribe(data => {
      console.log(data);
      workoutId = data;
      this.router.navigate(['workout-summary', workoutId] );

    });

  }


  getRepsFromSet(sets: SetModel[]): number {
    let reps = 0;
    for (let i = 0; i < sets.length; i++) {
      reps += Number(sets[i].reps);
    }

    return reps;

  }
}
