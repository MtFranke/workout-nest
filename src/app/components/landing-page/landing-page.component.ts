import { Component } from '@angular/core';
import {FooterComponent} from "./footer/footer.component";
import {DevicesComponent} from "./devices/devices.component";
import {IntroComponent} from "./intro/intro.component";
import {NavigationComponent} from "../navigation/navigation.component";

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    FooterComponent,
    DevicesComponent,
    IntroComponent,
    NavigationComponent
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {

}
