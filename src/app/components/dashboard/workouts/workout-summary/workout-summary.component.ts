import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {WorkoutModel} from "../models/workout.model";
import {NgForOf} from "@angular/common";
import {VolumeModel} from "../models/volume.model";
import {ExerciseModel} from "../models/exercise.model";
import {NavigationComponent} from "../../../navigation/navigation.component";

@Component({
  selector: 'app-workout-summary',
  standalone: true,
  imports: [
    NgForOf,
    NavigationComponent
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

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.guid = this.route.snapshot.paramMap.get('guid');
    this.http.get<ExerciseModel[]>('http://localhost:5213/exercises')
      .subscribe(data => {
        this.exercises = data;
      });

    this.http.get<WorkoutModel>('http://localhost:5213/workout/' + this.guid)
      .subscribe(data => {
        console.log(data);
        this.workout = data;
        for (let exercise of this.workout.exercises) {
          const volume = new VolumeModel();
          volume.exerciseId = this.getExerciseName(exercise.exercisesId);
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

  }

  getExerciseName(id: string): string {
    return this.exercises.find(x => x.id === id)?.name ?? "";
  }
  getExerciseMuscle(id: string): string {
    return this.exercises.find(x => x.id === id)?.primaryMuscleGroup ?? "";
  }
}
