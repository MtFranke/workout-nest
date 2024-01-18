export class VolumeModel{
  exerciseId: string = "";
  exerciseName: string = "";
  volume: number = 0;
  increase: number = 0;

}

export class WorkoutModelOuter{
  volumes : VolumeModel[] = [];
  totalVolume: number = 0;
  increase: number = 0;
}
