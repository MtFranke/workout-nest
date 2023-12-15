import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{


  public registerForm: FormGroup | any;


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
    console.log(this.registerForm.value);
  }
}
