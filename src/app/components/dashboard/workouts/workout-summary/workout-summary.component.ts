import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {WorkoutModel} from "../models/workout.model";
import {NgClass, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {VolumeModel, WorkoutModelOuter} from "../models/volume.model";
import {ExerciseModel} from "../models/exercise.model";
import {NavigationComponent} from "../../../navigation/navigation.component";
import {environment} from "../../../../../environment/environment";

@Component({
  selector: 'app-workout-summary',
  standalone: true,
  imports: [
    NgForOf,
    NavigationComponent,
    NgClass,
    NgOptimizedImage,
    NgIf
  ],
  templateUrl: './workout-summary.component.html',
  styleUrl: './workout-summary.component.css'
})
export class WorkoutSummaryComponent implements OnInit{
  guid: string | null = "";
  workout: WorkoutModel = new WorkoutModel();
  volumeModel: VolumeModel[] = [];
  exercises: ExerciseModel[] = [];
  totalVolume: number = 0;
  muscles: string[] = [];
  gains: WorkoutModelOuter = new WorkoutModelOuter();

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.guid = this.route.snapshot.paramMap.get('guid');
    this.http.get<ExerciseModel[]>(`${environment.workoutNestApiUrl}/exercises`)
      .subscribe(data => {
        this.exercises = data;
      });

    this.http.get<WorkoutModel>(`${environment.workoutNestApiUrl}/workout/` + this.guid)
      .subscribe(data => {
        console.log(data);
        this.workout = data;
        for (let exercise of this.workout.exercises) {
          const volume = new VolumeModel();
          volume.exerciseName = this.getExerciseName(exercise.exercisesId);
          volume.exerciseId = exercise.exercisesId;
          for (let set of exercise.sets) {
            volume.volume += set.reps * set.weight;
            this.totalVolume += set.reps * set.weight;
          }
          this.volumeModel.push(volume);
          if (!this.muscles.includes(this.getExerciseMuscle(exercise.exercisesId)))
          {
            this.muscles.push(this.getExerciseMuscle(exercise.exercisesId));
          }
        }

      });

    this.http.get<WorkoutModelOuter>(`${environment.workoutNestApiUrl}/workout/gains`)
      .subscribe(data => {
        this.gains = data;
        console.log(this.gains);
      });

  }

  getExerciseName(id: string): string {
    return this.exercises.find(x => x.id === id)?.name ?? "";
  }
  getExerciseMuscle(id: string): string {
    return this.exercises.find(x => x.id === id)?.primaryMuscleGroup ?? "";
  }


  getVolumeFromPreviousWorkout(exerciseId: string) {
    let volume = 0;
    for (let gain of this.gains.volumes) {
      if (gain.exerciseId === exerciseId) {
        volume = gain.volume;
      }
    }
    return volume;
  }

  getPercentageIncrease(exerciseId: string) {
    let increase = 0;
    for (let gain of this.gains.volumes) {
      if (gain.exerciseId === exerciseId) {
        increase = gain.increase;
      }
    }
    return increase;
  }

  getArrowIcon(percentageIncrease: number) {
    if(percentageIncrease > 0){
      return 'assets/icons/arrow-up-alt-filled-green.png';
    }
    if(percentageIncrease < 0) {
      return 'assets/icons/arrow-down-alt-filled-red.png';
    }
    return 'assets/icons/new-1.png';
  }

  onReturnClick() {
    this.router.navigate(['/dashboard']);
  }
}
