import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserSignUp, userSignUpBody } from './userSignup';
import { AuthService } from '../home/auth.service';
import { auth } from '../helpers/authHelper';
import { Router } from '@angular/router';
import { alertHelpers } from '../helpers/alertsHelper';
import { userSignInBody } from '../sign-in/userSignin';

const swalProps = {
  title: 'Sign up failed!!',
  icon: 'error',
};

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  errorMessage!: string;
  userSignUp = new UserSignUp();

  constructor(private authService: AuthService, private router: Router) {}

  resetForm(userSignUpForm: NgForm): void {
    userSignUpForm.reset();
  }

  save(userSignUpForm: NgForm): void {
    let payload: userSignUpBody = {
      userName: userSignUpForm.value.userName,
      email: userSignUpForm.value.email,
      password: userSignUpForm.value.passwords.password,
      confirmPassword: userSignUpForm.value.passwords.confirmPassword,
    };

    this.authService.signUp(payload).subscribe({
      next: (response: any) => this.onSignUpSuccess(response, userSignUpForm),
      error: (err) => (this.errorMessage = err),
    });
  }

  onSignUpSuccess(response: any, userSignUpForm: NgForm): void {
    if (response.userName) {
      const payload: userSignInBody = {
        username: userSignUpForm.value.email,
        password: userSignUpForm.value.passwords.password,
      };
      userSignUpForm.reset();
      this.authService.signIn(payload).subscribe({
        next: (response: any) => this.onSignInSuccess(response),
        error: (err) => this.onFail(),
      });
    } else {
      this.onFail();
    }
  }

  onSignInSuccess(response: any): void {
    if (response.username) {
      auth.setAuthValues(response);
      this.router.navigate(['/my-notes']);
    } else {
      alertHelpers.getInvalidLoginAlert({ ...swalProps });
    }
  }

  onFail(): void {
    alertHelpers.getInvalidLoginAlert({ ...swalProps });
  }
}
