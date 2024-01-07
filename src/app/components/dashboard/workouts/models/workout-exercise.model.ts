export class WorkoutExerciseModel{
  exercisesId: string = "";
  completed: boolean = false;

  constructor(public _exercisesId: string) {
    this.exercisesId = _exercisesId;
    this.completed = false;

  }
}
