import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {LanguageComponent} from "./language/language.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    LanguageComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private router: Router) {
  }

  onRegister() {
    this.router.navigate(['register'])
  }

  onLogin() {
    this.router.navigate(['login'])

  }
}
