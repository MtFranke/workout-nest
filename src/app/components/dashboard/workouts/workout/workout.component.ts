import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-workout',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './workout.component.html',
  styleUrl: './workout.component.css'
})
export class WorkoutComponent {

  guid: string | null = "";

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.guid = this.route.snapshot.paramMap.get('guid');
    // Now 'this.guid' contains the GUID from the URL
  }
}
