import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { CommonModule } from '@angular/common';
import { SignInComponent } from '../sign-in/sign-in.component';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { FormsModule } from '@angular/forms';
import { CheckPasswordDirective } from '../sign-up/comparePassword.directive';

@NgModule({
  declarations: [
    HomeComponent,
    SignInComponent,
    SignUpComponent,
    CheckPasswordDirective,
  ],
  imports: [CommonModule, FormsModule],
})
export class HomeModule {}
