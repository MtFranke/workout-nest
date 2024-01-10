import {SetModel} from "./set.model";

export class WorkoutExerciseModel{
  exercisesId: string = "";
  completed: boolean = false;
  sets: SetModel[] = [];

  constructor(public _exercisesId: string) {
    this.exercisesId = _exercisesId;
    this.completed = false;

  }
}
