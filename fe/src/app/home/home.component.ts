import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { auth } from '../helpers/authHelper';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  imageUrl: string = 'assets/notes_img.png';
  isLoggedIn: boolean = auth.isLoggedIn();

  constructor(private router: Router) {}

  handleCreateAccountClick() {
    this.router.navigate(['/signup']);
  }

  handleSignInClick() {
    this.router.navigate(['/signin']);
  }

  goToMyNotes() {
    this.router.navigate(['/my-notes']);
  }
}
