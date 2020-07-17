import { Component, OnInit } from '@angular/core';
// import { AngularFireDatabase, AngularFireList  } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../crud/shared/list.service';
import { Employee } from '../crud/shared/list.model';

import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';
import { NgIf } from '@angular/common';
// import { AdService, AdListing } from './ad.service';
import { NgForm } from '@angular/forms'

import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

  providers: [EmployeeService]

})

//this class is only for testing and debugging purpose 
// it has nothing to do with other code
export class LoginComponent implements OnInit {

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
  constructor(private db: AngularFireDatabase,
    public afAuth: AngularFireAuth, private router: Router, public route: ActivatedRoute,
    private employeeService: EmployeeService) {
    // db.list('/users').valueChanges().subscribe(users => {
    //   this.email = users;
    //   console.log(this.email);

    // });
    this.afAuth.authState.subscribe((auth) => {
      this.uid = auth.uid;
      this.data = db.list('/Posted_Ads/' + auth.uid + '/').valueChanges();

      this.data.subscribe(data => {
        console.log(data);
        console.log(this.uid);
        console.log(data[this.id]);
        this.viewData = data[this.id];
      });
    });
  }

  ngOnInit() {
    this.employeeService.getData();
    this.resetForm();
  }


  onSubmit(employeeForm: NgForm) {
    if (employeeForm.value.$key == null)
      this.employeeService.insertMessage(employeeForm.value);
    else
      this.employeeService.updateEmployee(employeeForm.value);
    this.resetForm(employeeForm);
    alert('Submitted Succcessfully Employee Register');
  }

  resetForm(employeeForm?: NgForm) {
    if (employeeForm != null)
      employeeForm.reset();
    this.employeeService.selectedEmployee = {
      $key: null,
      uid: '',
      name: '',
      price: 0,
      position: '',
      office: '',
      salary: 0,
      Category: '',
      Description: '',
      title: '',
      message: '',
      image: ''
    }
  }

}
