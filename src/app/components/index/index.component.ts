import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/observable/throw';

import { Employee } from '../crud/shared/list.model';
import { EmployeeService } from '../crud/shared/list.service';
import { NgIf } from '@angular/common';
import {AdDetailsComponent} from '../ad-details/ad-details.component';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  providers: [EmployeeService, AdDetailsComponent],
   
     

})
export class IndexComponent implements OnInit {

  username: any;
  email: any;
  password: any;
  courses: any[];
  users: any[];  
  employeeList: Employee[];
  imgsrc: Promise<any>;

  cats: any[];
  pops: any[];
  ads: any[];
  approvedAds: any[] = [];
  adInfo: any[];
  d: any;

  constructor(private adDetail: AdDetailsComponent,private employeeService: EmployeeService,private db: AngularFireDatabase, public afAuth: AngularFireAuth, private router: Router) {
    db.list('/users').valueChanges().subscribe(users => {
      this.users = users;
    });
    db.list('/Category').valueChanges().subscribe(cats => {      
      this.cats = cats;
    });
    db.list('/Category').valueChanges().subscribe(pops => {      
      this.pops = pops;
    });
    db.list('Posted_Ads/').valueChanges().subscribe(ads => {      
      this.ads = ads;
      if(this.ads != undefined){
        this.ads.map(x => {
          console.log(x);          
          if(x.status == "true"){
            console.log("in map", x);
          this.approvedAds.push(x);
          }
        })  
      }
      console.log("Here i m", this.ads);
    });

//     firebase.database().ref('Posted_Ads/')
//     DatabaseReference ref = FirebaseDatabase.getInstance().getReference();
// ref.child("messages").orderByChild("sender").equals("salam")
//     .addListenerForSingleValueEvent(new ValueEventListener({...}));
 
  }
     ngOnInit() {
            this.d = "farhan"
    var x = this.employeeService.getCategory();
    x.snapshotChanges().subscribe(item => {
      this.employeeList = [];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["$key"] = element.key;
        this.employeeList.push(y as Employee);
      });
    });
  }
  private addUsersData(email:string,password:string,username:String){
   const itemsRef = this.db.list('users');
   itemsRef.push({username: username, email: email,password:password });   
  }

  Register() {
    this.afAuth.auth.createUserWithEmailAndPassword(this.email, this.password).then(x => {
     this.addUsersData(this.email,this.password,this.username)
     this.router.navigate(['/dashboard/dashboard-content'])
     alert('Registration Successful !');
      
    }).catch(err => {
            //      Observable.throw(Error || 'Internal Server error');
            alert('Registration Failed !');            
         });
  }
  login() {

    this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password).then(x => {

      if(this.email=='admin@ijaarah.pk')
      {
        this.router.navigate(['/admin/admin-dashboard']);
        document.getElementById('sign-in-dialog').style.display = 'none';
        alert('Admin Login Successfully');    
     
      }
      else{
      console.log(x);
      this.router.navigate(['/dashboard/dashboard-content']);
      document.getElementById('sign-in-dialog').style.display = 'none';
      alert('Login Successfully');    
    }
    }).catch(err => {
      //      Observable.throw(Error || 'Internal Server error');
      alert('Invalid Email OR Password');     
      console.log(err);
      
    });
  }
  logout() {
    this.afAuth.auth.signOut();
  }
}
