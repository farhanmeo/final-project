import { Component, OnInit } from '@angular/core';

import { EmployeeService } from '../crud/shared/list.service';
import { AngularFireStorage } from 'angularfire2/storage';

import { Employee } from '../crud/shared/list.model';
import { NgForm } from '@angular/forms'
import { Router } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import firebase = require('firebase');
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { getUrlScheme } from '@angular/compiler';
//import * as firebase from 'firebase/app';

// import firebase = require('firebase');
//import firebase from 'firebase/app';
@Component({
  selector: 'app-my-ads',
  templateUrl: './my-ads.component.html',
  styleUrls: ['./my-ads.component.css'],
  providers: [EmployeeService],
  //  template: `
  //  *ngFor="let contacts of employeeList | async"
  //  `
})
export class MyAdsComponent implements OnInit {
  employeeList: Employee[];
  meta: Observable<any>;
  profileUrl: Observable<any>;
  url: string;
  uid: any;
  data: Observable<any[]>;
  imgsrc;
  // singleEvent$: Observable<Event>;


  constructor( private db: AngularFireDatabase,public afAuth: AngularFireAuth,private employeeService: EmployeeService, private router: Router,private storage: AngularFireStorage) {
   this.afAuth.authState.subscribe((auth) => {
    this.uid = auth.uid;
    this.data = db.list('/Posted_Ads/' + auth.uid + '/').valueChanges();
    
    this.data.subscribe(data => {
      console.log(this.uid);
    });
    console.log(this.employeeList);
    
  });
  

}
// getUrl(image: string, )
// {
//    this.imgsrc =  firebase.storage().ref().child('Posted-Add/images').getDownloadURL()
//}
   ngOnInit() {
    var x = this.employeeService.getData();
    x.snapshotChanges().subscribe(item => {
      this.employeeList = [];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["$key"] = element.key;
        this.employeeList.push(y as Employee);
         
        console.log(this.employeeList[1])
      });
    });
  
    this.imgsrc =  firebase.storage().ref().child('Posted-Add/images').getDownloadURL()  
 }
  onEdit(emp: Employee) {
    this.employeeService.selectedEmployee = Object.assign({}, emp);
    
  }
 
  onDelete(key: string) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.employeeService.deleteEmployee(key);
      alert("Deleted Successfully Employee register");
    }
  }
  onSubmit(employeeForm: NgForm) {
    if (employeeForm.value.$key == null)
    this.employeeService.insertEmployee(employeeForm.value);
  else
    this.employeeService.updateAd(employeeForm.value);
  this.resetForm(employeeForm);
alert('Submitted Succcessfully Employee Register');  
}
  resetForm(employeeForm?: NgForm) {
    if (employeeForm != null)
      employeeForm.reset();
    this.employeeService.selectedEmployee = {
      $key: null,
      name: '',
      position: '',
      office: '',
      salary: 0,
      Category: '',
      Description: '',
      title: '',
      message:'',
      image:''
    }
  }
}

