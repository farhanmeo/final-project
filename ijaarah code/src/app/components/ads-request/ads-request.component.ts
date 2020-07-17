import { Component, OnInit, Inject } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { EmployeeService } from '../crud/shared/list.service'
import { Employee } from '../crud/shared/list.model';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatFormFieldControl } from '@angular/material';

import { MatSnackBar } from '@angular/material';
export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'app-ads-request',
  templateUrl: './ads-request.component.html',
  styleUrls: ['./ads-request.component.css'],
  providers: [EmployeeService],

})
export class AdsRequestComponent implements OnInit {
  employeeList: Employee[];

  ads: any[] = [];
  pendingAds: any[] = [];
  animal: string;
  name: string;
  constructor(public snackBar: MatSnackBar, public dialog: MatDialog, private employeeService: EmployeeService, private ds: EmployeeService, private db: AngularFireDatabase, public afAuth: AngularFireAuth) {
    db.list('Posted_Ads/').valueChanges().subscribe(ads => {
      this.ads = ads;
      if (this.ads != undefined) {
        this.ads.map(x => {
          console.log(x);
          if (x.status == "pending") {
            console.log("in map", x);
            this.pendingAds.push(x);
          }
        })
      }
      // console.log("Here i m", this.ads);
    });

  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
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
  approved(ad: any) {
    console.log("approved", ad);
    this.ds.updateAd(ad);
  }
  onAprove(ad: Employee) {
    this.employeeService.selectedEmployee = Object.assign({}, ad);
    if (this.employeeService.selectedEmployee.$key == null)
      console.log("Key is null");
    else {
      console.log(this.employeeService.selectedEmployee.$key);

      this.employeeService.apprveAdByAdmin(this.employeeService.selectedEmployee.$key);

    }
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

  //   onSubmit(employeeForm: NgForm) {
  //     if (employeeForm.value.$key == null)
  //     this.employeeService.insertEmployee(employeeForm.value);
  //   else
  //     this.employeeService.apprveAdByAdmin(employeeForm.value);
  //   this.resetForm(employeeForm);

  // alert('Submitted Succcessfully Employee Register');  
  // }
  onSubmitDisapprove(employeeForm: NgForm) {
    if (employeeForm.value.$key == null)
      this.employeeService.insertEmployee(employeeForm.value);
    else
      this.employeeService.disapprveAdByAdmin(employeeForm.value);
    this.resetForm(employeeForm);

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
      message: '',
      price: 0,
      image: ''
    }
  }
  openSnackBar() {
    this.snackBar.open("hey", "close", {
      duration: 2000,
    });
  }
}
////Dialog box code
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}