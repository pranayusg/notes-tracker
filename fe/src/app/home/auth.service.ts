import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { userSignUpBody, userSignUpResponse } from '../sign-up/userSignup';
import { userSignInBody, userSignInResponse } from '../sign-in/userSignin';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private Url = environment.apiEndpoint;

  constructor(private http: HttpClient) {}

  private handleError(err: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

  // Open Routes
  signUp(user: userSignUpBody): Observable<userSignUpResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.Url}/users`, user, { headers }).pipe(
      tap((data) => console.log('sign up: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  signIn(user: userSignInBody): Observable<userSignInResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.Url}/auth`, user, { headers }).pipe(
      // tap((data) => {console.log('sign in : ' + JSON.stringify(data))}),
      catchError(this.handleError)
    );
  }
}
