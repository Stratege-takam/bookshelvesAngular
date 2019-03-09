import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  signInForm: FormGroup;
  errorMessage: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  }


  onSubmit(): void{
    //console.log(this.signUpForm.value);
    const email = this.signInForm.value.email;
    const password = this.signInForm.value.password;
    this.authService.signInUser(email, password).then(
      () => {
        console.log("success : ");
        this.router.navigate((["/books"]));
      },
      (error) =>  {
        this.errorMessage = error;
        console.log("error : ", error);
      }
    );
  }


}
