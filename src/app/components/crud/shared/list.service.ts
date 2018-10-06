import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database'
import { Employee } from './list.model'
import { Title } from '@angular/platform-browser';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
@Injectable()
export class EmployeeService {

  employeeList: AngularFireList<any>;
  message: AngularFireList<any>;
  category: AngularFireList<any>;
  uid: any;
  data: Observable<any[]>;
  
  selectedEmployee: Employee = new Employee;
  constructor(private db: AngularFireDatabase,private firebase :AngularFireDatabase,public afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe((auth) => {
      this.uid = auth.uid;
      this.data = db.list('/Posted_Ads/' + auth.uid + '/').valueChanges();
      
      this.data.subscribe(data => {
        console.log(this.uid);
      });
      console.log(this.employeeList);
      
    });
    
   }
 
   getData(){
    this.message = this.firebase.list('Messages');
    this.category = this.firebase.list('Category');
    
  
    this.employeeList = this.firebase.list('Posted_Ads/'+'Ic0Cfy3AsWYsL5PumEJLfrQZY523');
  return this.employeeList;
  }
  getUser()
  {
    this.employeeList = this.firebase.list('users');
  return this.employeeList;  
    
  }
  getMessage(){
    this.employeeList = this.firebase.list('Messages');
  return this.employeeList;  
  }
  getCategory(){
    this.employeeList = this.firebase.list('Category');
  return this.employeeList;
  }
  getEmployee(){
    this.employeeList = this.firebase.list('employees');
  return this.employeeList;
  }

  insertEmployee(employee: Employee){
this.employeeList.push({
  name: employee.name,
  position: employee.position,
  office: employee.office,
  salary: employee.salary ,
  Category: employee.Category,
  title: employee.title,
  Description: employee.Description 
});
  }
  insertMessage(employee: Employee){
    this.message.push({
      name: employee.name,
      //Category: employee.Category,
      message: employee.message      
    });
  }
  insertCategory(employee: Employee){
    this.category.push({
      Category: employee.Category,            
    });
  }

updateEmployee(employee: Employee){
this.employeeList.update(employee.$key,{
  name: employee.name,
  position: employee.position,
  office: employee.office,
  salary: employee.salary,
  Category: employee.Category,
  title: employee.title,
  Description: employee.Description  
});
}
updateAd(employee: Employee){
  this.employeeList.update(employee.$key,{
    Category: employee.Category,
    title: employee.title,
    Description: employee.Description  
  });
  }
deleteEmployee($key: string){
this.employeeList.remove($key);
}
}
