import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/list.service';
import { Employee } from '../shared/list.model';
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employeeList: Employee[];
  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    let x = this.employeeService.getCategory();
    x.snapshotChanges().subscribe(item => {
      this.employeeList = [];
      item.forEach(element => {
        let y = element.payload.toJSON();
        y["$key"] = element.key;
        this.employeeList.push(y as Employee);
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

}
