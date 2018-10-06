import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmployeeService } from '../crud/shared/list.service';
import { Employee } from '../crud/shared/list.model';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  providers: [EmployeeService]

})
export class AdminDashboardComponent implements OnInit {
 
  employeeList: Employee[];
  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    var x = this.employeeService.getUser();
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
  onSubmit(employeeForm: NgForm) {
    if (employeeForm.value.$key == null)
    this.employeeService.insertCategory(employeeForm.value);
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
    message:'',
    image:''
  }
}

}
