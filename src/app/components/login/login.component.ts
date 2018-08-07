import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { ActivatedRoute, Router } from '@angular/router';

import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';
import { NgIf } from '@angular/common';

//import { AdService, AdListing } from './ad.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: any;
  email: any;
  password: any;
  courses: any[];
  users: any[];
  error: string = '';
  loading = false;
  authenticationFlag = true;

  postAdd: FormGroup;
  uid: any;
  data: Observable<any[]>;
  id;
  sCategory: any[];
selectedFile = null;
  featuredPhotoSelected(event){
    // const file: File = event.target.files[0];
    // const metaData = {"contentType": file.type};
    // const storageRef: firebase.storage.Reference = firebase.storage().ref('/photos/featured/url');
    // storageRef.put(file, metaData);
    // console.log("uploading:", file.name);
this.selectedFile = event.target.files[0];
  }
  
  constructor(private http: HttpClient, public fb: FormBuilder, private db: AngularFireDatabase, public afAuth: AngularFireAuth, private router: Router) {
    this.createForm();
    console.log("post add");

    // db.list('/users').valueChanges().subscribe(users => {
    //   this.users = users;
    //   console.log(this.users);

    // });

    db.list('/Category')
    .valueChanges().subscribe(category => {
      this.sCategory = category;
      console.log(this.sCategory);
    })

  this.afAuth.authState.subscribe((auth) => {
    this.uid = auth.uid;
    this.data = db.list('/Posted_Ads/' + auth.uid + '/').valueChanges();
    console.log(this.data);

  })
  }
//   private addUsersDataForRegister(email:string,password:string,username:String){
//    const itemsRef = this.db.list('users');
// itemsRef.push({username: username, email: email,password:password });   
//   }
onUpload{
  const fd = new FormData();
    }
  

  createForm() {
    this.postAdd = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      Category: ['', [Validators.required, Validators.minLength(5)]],
      Description: ['', [Validators.required, Validators.minLength(5)]],
      price: [, [Validators.required, Validators.minLength(5)]],
      name: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.minLength(5)]],
      phone: [, [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      image: ['', [Validators.required]],
      keywords: ['', [Validators.required, Validators.minLength(5)]],
 

    })

  }
  // private addUsersDataForLogin() {
  //   const itemsRef = this.db.list('/login');
  //   itemsRef.push({ email: this.email, password: this.password });
  // }
  
  private addUsersData() {
    console.log(this.postAdd.value);
    console.log(this.uid);


 //   let itemsRef = this.db.list('/Posted_Ads/' + this.uid + '/');
    let itemsRef = this.db.list('/Posted_Ads/');
    if(itemsRef.push(this.postAdd.value))
    alert('Added !');


  }
  login() {

    console.log(this.email);
    console.log(this.password);

    this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password).then(x => {
      console.log(x);
      
      this.router.navigate(['/dashboard']);

      // if (x.status = true) {
      //   console.log(x);
      //   this.router.navigate(['/dashboard'])
      //   this.addUsersData();
      // } else {
      //   //  this.error = 'Username or password is incorrect';
      //   alert('Invalid Email');

      // }
    }).catch(err => {
      //      Observable.throw(Error || 'Internal Server error');
      //alert('Invalid Email OR Password');     
      this.error = 'Invalid ID OR Password';
      console.log(err);
      
    });
  }

  
  // Register() {
  //   this.afAuth.auth.createUserWithEmailAndPassword(this.email, this.password).then(x => {
  //    this.addUsersData(this.email,this.password,this.username)
  //    this.router.navigate(['/dashboard'])
      
  //   }).catch(err => {
      
  //     //      Observable.throw(Error || 'Internal Server error');
  //           alert('Registration Failed !');
            
  //        });
  // }
  logout() {
    this.afAuth.auth.signOut();
  }

  ngOnInit() {
  }

}
