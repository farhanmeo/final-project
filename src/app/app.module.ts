import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
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
// import { RouterModule, Routes } from '@angular/router';
//for image upload

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { MatProgressBarModule, MatButtonModule } from '@angular/material';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { MessagesComponent } from './components/messages/messages.component';
import { MyAdsComponent } from './components/my-ads/my-ads.component';
import { DashboardContentComponent } from './components/dashboard-content/dashboard-content.component';
import { EmployeesComponent } from './components/crud/employees.component';
import { EmployeeComponent } from './components/crud/employee/employee.component';
import { EmployeeListComponent } from './components/crud/employee-list/employee-list.component';
import { UploadFormComponent } from './components/uploads/upload-form/upload-form.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminComponent } from './components/admin/admin.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { FlexLayoutModule } from '@angular/flex-layout' ;
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
    MessagesComponent,
    MyAdsComponent,
    DashboardContentComponent,
    EmployeesComponent,
    EmployeeComponent,
    EmployeeListComponent,
    UploadFormComponent,
    AdminDashboardComponent,
    AdminComponent,
    UsersListComponent
 ],
 imports: [
  
    AppRoutingModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    //Firebase Database
     AngularFireModule.initializeApp(environment.firebaseConfig),
     AngularFireDatabaseModule,
     AngularFireAuthModule,
     HttpClientModule,
     BrowserAnimationsModule,
     AngularFireStorageModule,
     FlexLayoutModule,
 
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
