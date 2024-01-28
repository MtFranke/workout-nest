import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environment/environment";
import {FeedModel} from "./feed.model";
import {map} from "rxjs";
import {NgForOf} from "@angular/common";
import moment from 'moment';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css'
})
export class FeedComponent implements OnInit{

  data : FeedModel[] = [];

  constructor(public http: HttpClient) {
  }
  ngOnInit() {
    const url = `${environment.workoutNestApiUrl}/workouts`;
    this.http
      .get<FeedModel[]>(url)
      .subscribe((x)=> {
        this.data = x;
        console.log(this.data);
      });
  }

  protected readonly moment = moment;
}
