import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { environment } from './../environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from "./app.routing.module";
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { IndexComponent } from './components/index/index.component';
import { AddlistingComponent } from './components/addlisting/addlisting.component';
import {HttpClientModule } from '@angular/common/http';
import { BookingComponent } from './components/booking/booking.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { BookmarksComponent } from './components/bookmarks/bookmarks.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UploadListComponent } from './components/uploads/upload-list/upload-list.component';
import { UploadFormComponent } from './components/uploads/upload-form/upload-form.component';
//for image upload

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { MatProgressBarModule, MatButtonModule } from '@angular/material';
import { AngularFireStorageModule } from 'angularfire2/storage';
@NgModule({
  
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    IndexComponent,
    AddlistingComponent,
    BookingComponent,
    ReviewsComponent,
    BookmarksComponent,
    ProfileComponent,
    UploadListComponent,
    UploadFormComponent,
 ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
     AngularFireModule.initializeApp(environment.firebaseConfig),
     AngularFireDatabaseModule,
     AngularFireAuthModule,
     HttpClientModule,

     BrowserAnimationsModule,
     AngularFireStorageModule,
    //  MatProgressBarModule,
    //  MatButtonModule
 
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
