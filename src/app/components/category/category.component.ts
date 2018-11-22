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
  constructor(private es: EmployeeService,private db: AngularFireDatabase) { }

  ngOnInit() {
    this.categories = this.db.list('/Category');

    this.es.getData();
    //this.resetForm();
    this.db.list('/Category').valueChanges().subscribe(x => {      
      this.categories = x;
        if(this.categories != undefined)
      console.log(this.categories);

    });
  }
  addCategory(employeeForm: NgForm){
    this.es.insertCategory(employeeForm.value);
  }
//   onSubmit(employeeForm: NgForm) {
//     if (employeeForm.value.$key == null)
//     this.employeeService.insertMessage(employeeForm.value);
//   else
//     this.employeeService.updateEmployee(employeeForm.value);
//   this.resetForm(employeeForm);
// alert('Submitted Succcessfully Employee Register');  
// }

}
