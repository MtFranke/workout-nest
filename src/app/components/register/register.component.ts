import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {NgIf} from "@angular/common";
import {Router} from "@angular/router";
import {NavigationComponent} from "../navigation/navigation.component";
import {environment} from "../../../environment/environment";


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule, HttpClientModule, NgIf, NavigationComponent
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{

  successfullyRegistered: boolean = false;
  username: string = '';
  public registerForm: FormGroup | any;

  constructor(private http: HttpClient, private router: Router) {
  }


  ngOnInit() {

  this.registerForm = new FormGroup({
    'username': new FormControl('', [Validators.required]),
    'email': new FormControl('', [Validators.required]),
    'passwords': new FormGroup({
      'password': new FormControl('', [Validators.required]),
      'confirm': new FormControl('', [Validators.required])
    }, {validators: this.validateAreEqual})
    });

  }
  public validateAreEqual(c: AbstractControl): { notSame: boolean } | null {
    return c.value.password === c.value.confirm ? null : { notSame: true };
  }
  onSubmit() {
    const url = `${environment.workoutNestApiUrl}/auth/register`;
    this.username = this.registerForm.value['username'];
    const payload = {
      'username' : this.registerForm.value['username'],
      'email' : this.registerForm.value['email'],
      'password' : this.registerForm.value['passwords'].password,
    }

    this.http.post(url, payload)
      .subscribe(
        (x) => {
          console.log(x);
          this.successfullyRegistered = true;
        })
  }

  onGotoDashboard() {
    this.router.navigate(['dashboard']);
  }
}
