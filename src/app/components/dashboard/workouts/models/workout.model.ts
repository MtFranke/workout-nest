import {ExerciseModel} from "./exercise.model";
import {WorkedExerciseModel} from "./worked-exercise.model";

export class WorkoutModel{
  id: string = "";
  name: string = "";
  date: string = "";
  exercises: WorkedExerciseModel[] = [];
}
