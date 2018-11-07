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

import { EmployeesComponent } from './components/crud/employees.component';
import { EmployeeComponent } from './components/crud/employee/employee.component';
import { EmployeeListComponent } from './components/crud/employee-list/employee-list.component';
import { UploadFormComponent } from './components/uploads/upload-form/upload-form.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminComponent } from './components/admin/admin.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { AdDetailsComponent } from './components/ad-details/ad-details.component' ;

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
          { path: 'admin-dashboard', component: AdminDashboardComponent },

             
        ]
  },
  { path: 'admin', component: AdminComponent,
  children: [
     { path: 'admin-dashboard', component: AdminDashboardComponent },        
     { path: 'users-list', component: UsersListComponent },        

    ]
},

  { path: '', component: IndexComponent },
  // { path: 'dashboard', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'index', component: IndexComponent },
  { path: 'add-listing', component: AddlistingComponent },
  { path: 'employees', component: EmployeesComponent },
  { path: 'list', component: EmployeeListComponent },
  { path: 'upload', component: UploadFormComponent }, 
  { path: 'ad-details', component: AdDetailsComponent }, 
];


@NgModule({


  imports: [
    RouterModule.forRoot(routes)

  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }