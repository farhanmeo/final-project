import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList  } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../crud/shared/list.service';
import { Employee } from '../crud/shared/list.model';

import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';
import { NgIf } from '@angular/common';
// import { AdService, AdListing } from './ad.service';
import { NgForm } from '@angular/forms'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  
  providers: [EmployeeService]

})

export class LoginComponent implements OnInit {
   
  constructor(private employeeService: EmployeeService) {
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
    name: '',
    position: '',
    office: '',
    salary: 0,
    Category: '',
    Description: '',
    title: '',
    message:''
  }
}

}
