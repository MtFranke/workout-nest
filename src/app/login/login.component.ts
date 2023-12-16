import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {HttpClient, HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  public loginForm: FormGroup | any;

  constructor(private router: Router, private http: HttpClient) {

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

    const url = 'https://workoutnest.azurewebsites.net/auth/login';
    // const url = 'http://localhost:5213/auth/register';
    const payload = {
      'username' : this.loginForm.value['username'],
      'password' : this.loginForm.value['password']
    }

    this.http.post(url, payload)
      .subscribe(
        (x) => {
          console.log(x);
          this.router.navigate(['dashboard']);
        })
  }
}
