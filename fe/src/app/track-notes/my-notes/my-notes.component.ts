import { Component } from '@angular/core';
import { auth } from '../../helpers/authHelper';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-notes',
  templateUrl: './my-notes.component.html',
  styleUrls: ['./my-notes.component.css'],
})
export class MyNotesComponent {
  title = 'Notes Tracker';
  username = auth.getUsername();
  shouldReloadNotes = false;

  constructor(private router: Router) {}

  logOut() {
    auth.clearSession();
    this.router.navigate(['/']);
  }

  onReloadNotes(message: string): void {
    this.shouldReloadNotes = true;
  }
}
