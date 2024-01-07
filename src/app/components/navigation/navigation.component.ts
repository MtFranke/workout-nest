import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent implements OnInit{

  isUserLoggedIn: boolean = false;
  isDashboard:boolean = false;

  constructor(private router: Router, private authService: AuthService, private activatedRoute: ActivatedRoute){

  }

  ngOnInit() {
   this.isUserLoggedIn =  this.authService.isAuthenticated();
   //get last part of url
    this.isDashboard = this.router.url.split('/').pop() === '';

  }

  onLogoClick() {
    this.router.navigate(['dashboard']);
  }

  onLoginClick() {
    this.router.navigate(['login']);
  }

  onRegisterClick() {
    this.router.navigate(['register']);
  }
}
