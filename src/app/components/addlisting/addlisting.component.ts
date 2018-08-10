import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';
import { NgIf } from '@angular/common';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-addlisting',
  templateUrl: './addlisting.component.html',
  styleUrls: ['./addlisting.component.css']
})
export class AddlistingComponent implements OnInit {
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

  constructor(public fb: FormBuilder, private db: AngularFireDatabase, public afAuth: AngularFireAuth, private router: Router) {
    this.createForm();
    console.log("post add");

  
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
   createForm() {
    this.postAdd = this.fb.group({
      Category: ['', [Validators.required, Validators.minLength(5)]],
      title: ['', [Validators.required, Validators.minLength(5)]],
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
  private addUsersData() {
    console.log(this.postAdd.value);
    console.log(this.uid);


 //   let itemsRef = this.db.list('/Posted_Ads/' + this.uid + '/');
    let itemsRef = this.db.list('/Posted_Ads/');
    if(itemsRef.push(this.postAdd.value))
    alert('Added !');


  }

  ngOnInit() {
  }

}
