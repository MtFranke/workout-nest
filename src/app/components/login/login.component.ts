import {Component, inject, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {HttpClient, HttpClientModule, provideHttpClient, withInterceptors} from "@angular/common/http";
import {httpTokenAuthInterceptor} from "../../interceptors/token-auth.interceptor";
import {JwtHelperService} from "@auth0/angular-jwt";
import {AuthService} from "../../services/auth.service";
import {LanguageComponent} from "../landing-page/header/language/language.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    LanguageComponent,

  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  public loginForm: FormGroup | any;
  constructor(private router: Router, private http: HttpClient, private authService: AuthService) {

  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'username': new FormControl('', [Validators.required]),
      'password': new FormControl('', [Validators.required])}
    );
  }

  onRegisterClick() {
    this.router.navigate(['register']);

  }

  onSubmit() {

    //const url = 'https://workoutnest.azurewebsites.net/auth/login';
    const url = 'http://localhost:5213/auth/login';
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
