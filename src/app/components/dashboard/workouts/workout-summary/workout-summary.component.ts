import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {WorkoutModel} from "../models/workout.model";
import {NgForOf} from "@angular/common";
import {VolumeModel} from "../models/volume.model";
import {ExerciseModel} from "../models/exercise.model";

@Component({
  selector: 'app-workout-summary',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './workout-summary.component.html',
  styleUrl: './workout-summary.component.css'
})
export class WorkoutSummaryComponent implements OnInit{
  guid: string | null = "";
  workout: WorkoutModel = new WorkoutModel();
  volumeModel: VolumeModel[] = [];
  exercises: ExerciseModel[] = [];

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
          }
          this.volumeModel.push(volume);
        }

      });

  }

  getExerciseName(id: string): string {
    return this.exercises.find(x => x.id === id)?.name ?? "";
  }
}
