import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../crud/shared/list.service'
import { Employee } from '../crud/shared/list.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-approved-ads',
  templateUrl: './approved-ads.component.html',
  styleUrls: ['./approved-ads.component.css'],
  providers: [EmployeeService],

})
export class ApprovedAdsComponent implements OnInit {
  employeeList: Employee[];

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    var x = this.employeeService.getData();
    x.snapshotChanges().subscribe(item => {
      this.employeeList = [];
      console.log(item);

      item.forEach(element => {
        console.log(element);

        var y = element.payload.toJSON();
        y["$key"] = element.key;
        console.log("before", element.key);

        this.employeeList.push(y as Employee);
        console.log("After", this.employeeList)
      });
    });
  }
  onAprove(ad: Employee) {
    this.employeeService.selectedEmployee = Object.assign({}, ad);
    if (this.employeeService.selectedEmployee.$key == null)
      console.log("Key is null");
    else
      this.employeeService.apprveAdByAdmin(this.employeeService.selectedEmployee.$key);
    this.resetForm();

    alert('Submitted Succcessfully Employee Register');
  }
  onDisaprove(ad: Employee) {
    this.employeeService.selectedEmployee = Object.assign({}, ad);
    if (this.employeeService.selectedEmployee.$key == null)
      console.log("Key is null");
    else
      this.employeeService.disapprveAdByAdmin(this.employeeService.selectedEmployee.$key);
    this.resetForm();
    alert('Submitted Succcessfully Employee Register');
  }

  resetForm(employeeForm?: NgForm) {
    if (employeeForm != null)
      employeeForm.reset();
    this.employeeService.selectedEmployee = {
      $key: null,
      uid: '',
      name: '',
      position: '',
      office: '',
      salary: 0,
      Category: '',
      Description: '',
      title: '',
      price: 0,
      message: '',
      image: ''
    }
  }


}
