import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../crud/shared/list.service';
import { Employee } from '../crud/shared/list.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
  providers: [EmployeeService]

})
export class BookingComponent implements OnInit {
  employeeList: Employee[];
  time: string;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    var x = this.employeeService.getBooking();
    x.snapshotChanges().subscribe(item => {
      this.employeeList = [];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["$key"] = element.key;
        this.employeeList.push(y as Employee);
        console.log(this.employeeList)
        this.time = new Date().getDate().toString() + ' ' + new Date().getDay().toString() + ' ' + new Date().getHours().toString() + ':' + new Date().getMinutes().toString();
        console.log(this.time);
      });
    });
  }

  approve(key: any) {
    this.employeeService.selectedEmployee = Object.assign({}, key);
    // if(this.employeeService.selectedEmployee.$key == null)
    // console.log("Key is null");    
    // else
    // {
    // this.employeeService.approveBooking("LWCzWIscVKXuELt4tnG");
    console.log("s");

    //}
    this.resetForm();

    alert('Submitted Succcessfully Employee Register');

  }
  cancel() {

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
      message: '',
      price: 0,
      image: ''
    }
  }
}
