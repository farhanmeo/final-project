import { Component, OnInit } from '@angular/core';
import { Employee } from '../crud/shared/list.model';
import { AngularFireDatabase } from 'angularfire2/database';
import { EmployeeService } from '../crud/shared/list.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { AngularFireAuth } from 'angularfire2/auth';
import { DialogComponent } from '../../dialog/dialog.component';
import { allResolved } from 'q';

@Component({
  selector: 'app-ad-details',
  templateUrl: './ad-details.component.html',
  styleUrls: ['./ad-details.component.css'],
  providers: [EmployeeService],
})
export class AdDetailsComponent implements OnInit {
  ad: Employee;
  uid: any;
  detail: any[];
  ads: any[];
  change: string = "overview";
  spinner: any = 0;
  username: any;
  email: any;
  password: any;
  courses: any[];
  users: any[];
  employeeList: Employee[];
  imgsrc: Promise<any>;
  adTitle: string;

  cats: any[];
  pops: any[];
  approvedAds: any[] = [];
  adInfo: any[];
  d: any;
  constructor(public dialog: MatDialog,
    public afAuth: AngularFireAuth, private db: AngularFireDatabase, private es: EmployeeService, private router: Router) {
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  public imagesUrl;

  ngOnInit() {
    this.es.getData();
    console.log(this.es.getAdd());
    this.ads = this.es.getAdd();
    console.log("data =>", this.ads);

    document.getElementById('wrapper').scrollIntoView();
    this.imagesUrl = [
      this.ads[0].url,
      this.ads[0].url,
      this.ads[0].url,


    ];
    this.adTitle = this.ads[0].title;
    this.uid = this.ads[0].uid;
  }

  tabChange(val) {
    this.change = val
  }
  booking(pTime: string, pDate: string, rTime: string, rDate: string, name: string, phone: number) {
    if (pTime == '' && pDate == '' && rTime == '' && rDate == '' && name == '') {
      alert("Booking Failed please input all fields")
    } else {
      this.spinner = 1;
      console.log("i am here =>", pTime, pDate, rTime, rDate);
      this.es.insertBooking(this.adTitle, pTime, pDate, rTime, rDate, name, phone);
    }


  }
  sendMessage(name: string, message: string) {
    if (name == '' || message == '') {
      alert("Message failed please input all fields");
    } else {

      this.es.sendMessage(name, message);
      console.log("in send message");

    }
  }
  sendReview(rname: string, message: string) {
    console.log("in", rname, message);

    if (message == '') {
      alert("Review failed please input all fields");
    } else {

      this.es.sendReview(message, rname);
      console.log("in send message");

    }
  }
  private addUsersData(email: string, password: string, username: String) {
    const itemsRef = this.db.list('users');
    itemsRef.push({ username: username, email: email, password: password });
  }


  Register() {
    this.afAuth.auth.createUserWithEmailAndPassword(this.email, this.password).then(x => {
      this.addUsersData(this.email, this.password, this.username)
      this.router.navigate(['/dashboard/dashboard-content'])
      alert('Registration Successful !');

    }).catch(err => {
      //      Observable.throw(Error || 'Internal Server error');
      alert('Registration Failed !');
    });
  }
  login() {

    this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password).then(x => {

      if (this.email == 'admin@ijaarah.pk') {
        this.router.navigate(['/admin/admin-dashboard']);
        document.getElementById('sign-in-dialog').style.display = 'none';
        alert('Admin Login Successfully');

      }
      else {
        console.log(x);
        this.router.navigate(['/dashboard/dashboard-content']);
        document.getElementById('sign-in-dialog').style.display = 'none';
        alert('Login Successfully');
      }
    }).catch(err => {
      //      Observable.throw(Error || 'Internal Server error');
      alert('Invalid Email OR Password');
      console.log(err);

    });
  }
  logout() {
    this.afAuth.auth.signOut();
  }
}


