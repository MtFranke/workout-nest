import {WorkoutExerciseModel} from "./workout-exercise.model";

export class WorkoutSchemaTrainingModel{
  id: string = "";
  name: string = "";
  workoutSchemaId: string = "";
  workoutExerciseModel: WorkoutExerciseModel[] = [];
}
