import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
// import * as firebase from 'firebase/app';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/observable/throw';

// import { AdService, AdListing } from './ad.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { Employee } from '../crud/shared/list.model';
import { EmployeeService } from '../crud/shared/list.service';
import { NgIf } from '@angular/common';
import firebase = require('firebase');

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  providers: [EmployeeService]

})
export class IndexComponent implements OnInit {

  username: any;
  email: any;
  password: any;
  courses: any[];
  users: any[];  
  employeeList: Employee[];
  imgsrc: Promise<any>;


  constructor(private employeeService: EmployeeService,private db: AngularFireDatabase, public afAuth: AngularFireAuth, private router: Router) {
    db.list('/users').valueChanges().subscribe(users => {
      this.users = users;
      console.log(this.users);

    });
  }
  ngOnInit() {
    var x = this.employeeService.getData();
    x.snapshotChanges().subscribe(item => {
      this.employeeList = [];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["$key"] = element.key;
        this.employeeList.push(y as Employee);
        console.log(this.employeeList)
      });
    });

    this.imgsrc =  firebase.storage().ref().child('Posted-Add/images').getDownloadURL()
  }
  private addUsersData(email:string,password:string,username:String){
   const itemsRef = this.db.list('users');
itemsRef.push({username: username, email: email,password:password });   
  }

  Register() {
    this.afAuth.auth.createUserWithEmailAndPassword(this.email, this.password).then(x => {
     this.addUsersData(this.email,this.password,this.username)
     this.router.navigate(['/dashboard/dashboard-content'])
     alert('Registration Successful !');
      
    }).catch(err => {
      
      //      Observable.throw(Error || 'Internal Server error');
            alert('Registration Failed !');
            
         });
  }
  login() {

    console.log(this.email);
    console.log(this.password);
    console.log(this.afAuth.auth.currentUser);
    this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password).then(x => {

      if(this.email=='admin@ijaarah.pk')
      {
        this.router.navigate(['/admin/admin-dashboard']);
        document.getElementById('sign-in-dialog').style.display = 'none';
        alert('Admin Login Successfully');    
     
      }
      else{
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
