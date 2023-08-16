import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeModule } from './home/home.module';
import { MyNotesComponent } from './track-notes/my-notes/my-notes.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './home/auth.guard';
import { SignInGuard } from './track-notes/sign-in.guard';
import { MyNotesModule } from './track-notes/notes.module';

@NgModule({
  declarations: [AppComponent, NotFoundComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    HomeModule,
    MyNotesModule,

    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      {
        path: 'signup',
        canActivate: [AuthGuard],
        component: SignUpComponent,
      },
      {
        path: 'signin',
        pathMatch: 'full',
        canActivate: [AuthGuard],
        component: SignInComponent,
      },
      {
        path: 'my-notes',
        canActivate: [SignInGuard],
        component: MyNotesComponent,
      },

      { path: '**', component: NotFoundComponent },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
