import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { IndexComponent } from './components/index/index.component';
import { AddlistingComponent } from './components/addlisting/addlisting.component';
import { MessagesComponent } from './components/messages/messages.component';
import { BookingComponent } from './components/booking/booking.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { BookmarksComponent } from './components/bookmarks/bookmarks.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MyAdsComponent } from './components/my-ads/my-ads.component';
import { DashboardContentComponent } from './components/dashboard-content/dashboard-content.component';

import { EmployeesComponent } from './components/employees/employees.component';
import { EmployeeComponent } from './components/employees/employee/employee.component';
import { EmployeeListComponent } from './components/employees/employee-list/employee-list.component';


const routes: Routes = [
  { path: 'add-listing', component: AddlistingComponent },
 
  { 
    path: 'dashboard', component: DashboardComponent ,
    children: [
         { path: 'dashboard-content', component: DashboardContentComponent}, 
          { path: 'messages', component: MessagesComponent}, 
          { path: 'booking', component: BookingComponent },
          { path: 'reviews', component: ReviewsComponent },
          { path: 'bookmarks', component: BookmarksComponent },
          { path: 'profile', component: ProfileComponent },
          { path: 'my-ads', component: MyAdsComponent },
          { path: 'add-listing', component: AddlistingComponent },
             
        ]
  },
  { path: '', component: IndexComponent },
  // { path: 'dashboard', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'index', component: IndexComponent },
  { path: 'add-listing', component: AddlistingComponent },
  { path: 'employees', component: EmployeesComponent },
  { path: 'list', component: EmployeeListComponent },
 
];


@NgModule({


  imports: [
    RouterModule.forRoot(routes)

  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }