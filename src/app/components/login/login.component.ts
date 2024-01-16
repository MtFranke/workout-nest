import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../services/auth.service";
import {NavigationComponent} from "../navigation/navigation.component";
import {environment} from "../../../environment/environment";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NavigationComponent

  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  public loginForm: FormGroup | any;
  constructor(private router: Router, private http: HttpClient, private authService: AuthService) {

  }

  ngOnInit() {

    if (this.authService.isAuthenticated()) {
      this.router.navigate(['dashboard']);

    }

    this.loginForm = new FormGroup({
      'username': new FormControl('', [Validators.required]),
      'password': new FormControl('', [Validators.required])}
    );
  }

  onRegisterClick() {
    this.router.navigate(['register']);

  }

  onSubmit() {

    const url = `${environment.workoutNestApiUrl}/auth/login`;
    const payload = {
      'username' : this.loginForm.value['username'],
      'password' : this.loginForm.value['password']
    }

    this.http.post<{accessToken: string }>(url, payload)
      .subscribe(
        (x) => {
          const token  = x.accessToken;
          console.log(token);
          this.authService.setAccessToken(token);
          this.router.navigate(['dashboard']);
        })
  }
}
