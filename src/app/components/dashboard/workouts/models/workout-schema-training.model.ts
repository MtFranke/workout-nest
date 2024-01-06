import {WorkoutExerciseModel} from "./workout-exercise.model";

export class WorkoutSchemaTrainingModel{
  id: string = "";
  name: string = "";
  workoutExerciseModel: WorkoutExerciseModel[] = [];
}
