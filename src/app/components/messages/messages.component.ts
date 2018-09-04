import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../crud/shared/list.service';
import { Employee } from '../crud/shared/list.model';
import { NgForm } from '@angular/forms'

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
  providers: [EmployeeService]
})
export class MessagesComponent implements OnInit {
  employeeList: Employee[];
  time: string;
  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    var x = this.employeeService.getMessage();
    x.snapshotChanges().subscribe(item => {
      this.employeeList = [];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["$key"] = element.key;
        this.employeeList.push(y as Employee);
        console.log(this.employeeList)
        this.time = new Date().getDate().toString() +' '+new Date().getDay().toString()+' '+ new Date().getHours().toString() +':'+ new Date().getMinutes().toString();
        console.log(this.time);
      });
    });

  }

}
