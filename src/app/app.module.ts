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
@NgModule({
  
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    IndexComponent,
    AddlistingComponent,
 ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
     AngularFireModule.initializeApp(environment.firebaseConfig),
     AngularFireDatabaseModule,
     AngularFireAuthModule,
     HttpClientModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
