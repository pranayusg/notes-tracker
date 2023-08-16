import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { auth } from '../helpers/authHelper';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  private Url = environment.apiEndpoint;
  private Token = auth.getToken();

  constructor(private http: HttpClient) {}

  getMyNotes(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.Token}`,
    });
    return this.http
      .get<any>(`${this.Url}/note/mynotes`, { headers })
      .pipe(catchError(this.handleError));
  }

  getNoteById(noteId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.Token}`,
    });
    return this.http
      .get<any>(`${this.Url}/note/${noteId}`, { headers })
      .pipe(catchError(this.handleError));
  }

  createNote(note: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.Token}`,
    });
    return this.http
      .post<any>(`${this.Url}/note`, note, { headers })
      .pipe(catchError(this.handleError));
  }

  editNote(noteId: string, note: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.Token}`,
    });
    return this.http
      .patch<any>(`${this.Url}/note/${noteId}`, note, { headers })
      .pipe(
        // tap((data) => {console.log('sign in : ' + JSON.stringify(data))}),
        catchError(this.handleError)
      );
  }

  deleteNote(id: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.Token}`,
    });
    return this.http.delete<any>(`${this.Url}/note/${id}`, { headers }).pipe(
      // tap((data) => {console.log('sign in : ' + JSON.stringify(data))}),
      catchError(this.handleError)
    );
  }

  searchNotes(text: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.Token}`,
    });
    return this.http
      .get<any>(`${this.Url}/note/search/note?note=${text}`, { headers })
      .pipe(
        // tap((data) => {console.log('sign in : ' + JSON.stringify(data))}),
        catchError(this.handleError)
      );
  }

  getOtherUsers(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.Token}`,
    });
    return this.http.get<any>(`${this.Url}/users`, { headers }).pipe(
      // tap((data) => {console.log('sign in : ' + JSON.stringify(data))}),
      catchError(this.handleError)
    );
  }

  getSharedUsers(noteId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.Token}`,
    });
    return this.http
      .get<any>(`${this.Url}/note/shared/note/users?noteId=${noteId}`, {
        headers,
      })
      .pipe(
        // tap((data) => {console.log('sign in : ' + JSON.stringify(data))}),
        catchError(this.handleError)
      );
  }

  createSharedNote(payload: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.Token}`,
    });
    return this.http
      .post<any>(`${this.Url}/note/shared/note`, payload, {
        headers,
      })
      .pipe(
        // tap((data) => {console.log('sign in : ' + JSON.stringify(data))}),
        catchError(this.handleError)
      );
  }

  getSharedNotes(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.Token}`,
    });
    return this.http
      .get<any>(`${this.Url}/note/shared/note`, {
        headers,
      })
      .pipe(catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
