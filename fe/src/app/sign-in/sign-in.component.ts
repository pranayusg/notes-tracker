import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserSignIn, userSignInBody } from './userSignin';
import { AuthService } from '../home/auth.service';
import { auth } from '../helpers/authHelper';
import { alertHelpers } from '../helpers/alertsHelper';
import { Router } from '@angular/router';

const swalProps = {
  title: 'Invalid Credentials!!',
  icon: 'error',
};

@Component({
  selector: 'app-signin',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {
  userSignIn = new UserSignIn();
  errorMessage!: string;

  constructor(private authService: AuthService, private router: Router) {}

  save(userSignInForm: NgForm): void {
    let payload: userSignInBody = {
      username: userSignInForm.value.email,
      password: userSignInForm.value.password,
    };
    this.authService.signIn(payload).subscribe({
      next: (response: any) => this.onSuccess(response, userSignInForm),
      error: (err) => this.onFail(),
    });
  }

  resetForm(userSignInForm: NgForm): void {
    userSignInForm.reset();
  }

  onSuccess(response: any, userSignInForm: NgForm): void {
    if (response.username) {
      auth.setAuthValues(response);
      userSignInForm.reset();
      this.router.navigate(['/my-notes']);
    } else {
      alertHelpers.getInvalidLoginAlert({ ...swalProps });
    }
  }

  onFail(): void {
    alertHelpers.getInvalidLoginAlert({ ...swalProps });
  }
}
