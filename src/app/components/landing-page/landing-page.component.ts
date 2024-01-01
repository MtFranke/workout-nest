import { Component } from '@angular/core';
import {FooterComponent} from "./footer/footer.component";
import {HeaderComponent} from "./header/header.component";
import {DevicesComponent} from "./devices/devices.component";
import {IntroComponent} from "./intro/intro.component";

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    FooterComponent,
    HeaderComponent,
    DevicesComponent,
    IntroComponent
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {

}
