import { Injectable, style } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'
import { Employee } from './list.model'
import { Title } from '@angular/platform-browser';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import {
  MatSnackBar, MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition
} from '@angular/material';
import { Router } from '@angular/router';

var data = [];
export interface data {
  ad: string[]
}

@Injectable()
export class EmployeeService {
  d = []
  Data: data[] = [{
    ad: ["test"]
  }];

  setAdd(ad: data) {

    data.pop();
    data.push(ad);
    console.log(this.d);

  }
  getAdd() {
    // console.log(this.d);
    return data;
  }

  employeeList: AngularFireList<any>;
  message: AngularFireList<any>;
  category: AngularFireList<any>;
  booking: AngularFireList<any>;
  isApprove: AngularFireList<any>;
  review: AngularFireList<any>;


  uid: any;
  data: Observable<any[]>;

  selectedEmployee: Employee = new Employee();
  constructor(
    private router: Router,
    public snackBar: MatSnackBar,
    private db: AngularFireDatabase,
    private firebase: AngularFireDatabase, public afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe((auth) => {
      this.uid = auth.uid;
      this.data = db.list('/Posted_Ads/' + auth.uid + '/').valueChanges();
      this.data.subscribe(data => {
      });

    });

  }
  ngOnInit() {
  }

  // getting data from each node from firebase
  getData() {
    this.message = this.firebase.list('Messages');
    this.booking = this.firebase.list('booking')
    this.category = this.firebase.list('Category');
    this.isApprove = this.firebase.list('Posted_Ads');
    this.employeeList = this.firebase.list('Posted_Ads/');
    this.review = this.firebase.list('Review');
    return this.employeeList;
  }

  //getting all authenticated user's data from firebase 
  getUser() {
    this.employeeList = this.firebase.list('users');
    return this.employeeList;

  }

  //getting messages from firebase group by vendor
  getMessage() {
    this.employeeList = this.firebase.list('Messages');
    return this.employeeList;
  }

  //getting boooking records frpm firebase group by ads
  getBooking() {
    this.employeeList = this.firebase.list('booking');
    return this.employeeList;
  }

  //getting all categories from firebase
  getCategory() {
    this.employeeList = this.firebase.list('Category');
    return this.employeeList;
  }

  // these 5 methods are for testing purpose getEmployee, insertEmployee, deleteEmployee, 
  // disableEmployee and updateEmployee
  getEmployee() {
    this.employeeList = this.firebase.list('employees');
    return this.employeeList;
  }
  insertEmployee(employee: Employee) {
    console.log(employee);

    this.employeeList.push({
      name: employee.name,
      position: employee.position,
      office: employee.office,
      salary: employee.salary,
      title: employee.title,
      Description: employee.Description,
      price: employee.price,
      Category: employee.Category,

    });
  }
  updateEmployee(employee: Employee) {
    this.employeeList.update(employee.$key, {
      Category: employee.Category,
      // name: employee.name,
      // position: employee.position,
      // office: employee.office,
      // salary: employee.salary,
      // title: employee.title,
      // Description: employee.Description
    });
  }
  insertMessage(employee: Employee) {
    this.message.push({
      name: employee.name,
      message: employee.message
    });
  }
  deleteEmployee($key: string) {
    this.employeeList.remove($key);
  }
  disableEmployee($key: string) {
    this.employeeList.update($key, {
      isReserved: "true"

    });
  }

  //send direct message to product owner for rent
  sendMessage(name: string, msg: string) {
    this.message.push({
      name: name,
      message: msg,
    })
    alert('Message Sent successfully :)');
    this.router.navigate(['/index']);

    // this.openSnackBar("Message sent successfully.");
  }

  //post review for every ad 
  sendReview(name: string, msg: string) {
    this.review.push({
      name: name,
      message: msg,
    })
    alert('Message Sent successfully :)');
    this.router.navigate(['/index']);

    // this.openSnackBar("Message sent successfully.");
  }

  // this function insert booking in firebase as per ad and vendor
  insertBooking(title: any, pTime: string, pDate: string, rTime: string, rDate: string, name: string, phone: number) {
    this.booking.push({
      pickTime: pTime,
      pickData: pDate,
      returnTime: rTime,
      returnDate: rDate,
      name: name,
      phone: phone,
      title: title
    });
    console.log(this.message);

    alert('Booking request Sent successfully :)');
    this.router.navigate(['/index']);

  }

  // this function belong to admin who can add category in firebase
  insertCategory(employee: Employee) {
    this.category.push({
      Category: employee.Category
    });
  }

  updateAd(employee: Employee) {
    this.employeeList.update(employee.$key, {
      Category: employee.Category,
      title: employee.title,
      Description: employee.Description
    });
  }

  //this function belogs to admin who approve ads from vendors
  apprveAdByAdmin(employee: any) {
    this.employeeList.update(employee, {
      status: "true",
    });
  }
  disapprveAdByAdmin(employee: any) {
    this.employeeList.update(employee, {
      status: "false",
    });
  }

  //this function belogs to vendore who approve booking from customers
  approveBooking(employee: any) {
    console.log("in approve booking ");

    this.employeeList.update(employee, {
      status: "false",
    });
  }


  openSnackBar(message: string) {
    this.snackBar.open(message, "close", {
      duration: 20000,
      verticalPosition: 'top', horizontalPosition: 'end'
    });
  }

}
