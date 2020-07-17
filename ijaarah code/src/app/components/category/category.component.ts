import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../crud/shared/list.service'
import { AngularFireDatabase } from 'angularfire2/database';
import { Employee } from '../crud/shared/list.model'
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  providers: [EmployeeService],

})
export class CategoryComponent implements OnInit {

  categories: any
  data: Employee
  constructor(private emplyeeService: EmployeeService, private db: AngularFireDatabase) { }

  ngOnInit() {
    this.emplyeeService.getData();
    this.resetForm();
  }

  onSubmit(employeeForm: NgForm) {
    if (employeeForm.value.$key == null)
      this.emplyeeService.insertCategory(employeeForm.value);
    else
      this.emplyeeService.updateEmployee(employeeForm.value);
    this.resetForm(employeeForm);
    alert('Submitted Succcessfully Employee Register');
  }

  resetForm(employeeForm?: NgForm) {
    if (employeeForm != null)
      employeeForm.reset();
    this.emplyeeService.selectedEmployee = {
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
