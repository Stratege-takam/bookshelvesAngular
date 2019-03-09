import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;
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
    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  }


  onSubmit(): void{
    //console.log(this.signUpForm.value);
    const email = this.signUpForm.value.email;
    const password = this.signUpForm.value.password;
    this.authService.createNewUser(email, password).then(
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
