import { Component, OnInit } from '@angular/core';

import { EmployeeService } from '../crud/shared/list.service';

import { Employee } from '../crud/shared/list.model';
import { NgForm } from '@angular/forms'
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-ads',
  templateUrl: './my-ads.component.html',
  styleUrls: ['./my-ads.component.css'],
  providers: [EmployeeService]
})
export class MyAdsComponent implements OnInit {
  employeeList: Employee[];

  constructor(private employeeService: EmployeeService, private router: Router) {
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
      message:''
    }
  }
}

