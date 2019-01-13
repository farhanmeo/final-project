import { Component, OnInit , Inject} from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { EmployeeService} from '../crud/shared/list.service'
import { Employee } from '../crud/shared/list.model';
import { NgForm } from '@angular/forms';

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
  constructor(private employeeService: EmployeeService,private ds: EmployeeService,private db: AngularFireDatabase, public afAuth: AngularFireAuth ) { 
    db.list('Posted_Ads/').valueChanges().subscribe(ads => {      
      this.ads = ads;
      if(this.ads != undefined){
        this.ads.map(x => {
          console.log(x);          
          if(x.status == "pending"){
            console.log("in map", x);
          this.pendingAds.push(x);
          }
        })  
      }
      // console.log("Here i m", this.ads);
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
        console.log("After",this.employeeList)
      });
    });
  }
  approved(ad:any){
    console.log("approved", ad);
    this.ds.updateAd(ad); 
  }
  onEdit(ad: Employee) {
    this.employeeService.selectedEmployee = Object.assign({}, ad);
  }
  
  onSubmit(employeeForm: NgForm) {
    if (employeeForm.value.$key == null)
    this.employeeService.insertEmployee(employeeForm.value);
  else
    this.employeeService.apprveAdByAdmin(employeeForm.value);
  this.resetForm(employeeForm);

alert('Submitted Succcessfully Employee Register');  
}
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
    uid:'',
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
