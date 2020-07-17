import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
// import * as firebase from 'firebase/app';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../crud/shared/list.service'
import { BookingComponent } from '../booking/booking.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [EmployeeService],

})
export class DashboardComponent implements OnInit {
  username: any;
  email: any;
  password: any;
  time: any;
  date: any;
  name: any;
  phone: any;
  pickuptime: any;
  returntime: any;
  id: number;
  uid;
  data;
  viewData;
  booking: any[] = [];
  bookingCount: any
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      console.log(this.id);

      // In a real app: dispatch action to load the details here.
    });
  }

  constructor(public all: EmployeeService, private db: AngularFireDatabase, public afAuth: AngularFireAuth, private router: Router, public route: ActivatedRoute) {
    db.list('/users').valueChanges().subscribe(users => {
      this.email = users;
      console.log(this.email);

    });
    this.afAuth.authState.subscribe((auth) => {
      this.uid = auth.uid;
      this.data = db.list('/Posted_Ads/' + this.uid + '/').valueChanges();

      this.data.subscribe(data => {
        // console.log(data);
        // console.log(this.uid);
        // console.log(data[this.id]);
        this.viewData = data[this.id];
        console.log(this.viewData);
      });


    });

  }

}
