import {WorkedExerciseModel} from "./worked-exercise.model";

export class SaveWorkoutModel{

  constructor(public name: string, public workoutSchemaId: string ,public exercises: WorkedExerciseModel[]) {


  }
}
