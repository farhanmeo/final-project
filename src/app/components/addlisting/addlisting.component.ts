import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';
import { NgIf } from '@angular/common';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { Employee } from '../crud/shared/list.model';
import { EmployeeService } from '../crud/shared/list.service';


@Component({
  selector: 'app-addlisting',
  templateUrl: './addlisting.component.html',
  styleUrls: ['./addlisting.component.css'],
  providers: [EmployeeService]
})
export class AddlistingComponent implements OnInit {
  employeeList: Employee[];
  title = 'app';
  selectedFiles: FileList;
  file: File;
  imgsrc;
  color: string = 'primary';
  mode: 'determinate';
  progressBarValue;


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
  uniqkey1;

  constructor(private employeeService: EmployeeService, private storage: AngularFireStorage, public fb: FormBuilder, private db: AngularFireDatabase, public afAuth: AngularFireAuth, private router: Router) {

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
  ngOnInit() {
    var x = this.employeeService.getCategory();
    x.snapshotChanges().subscribe(item => {
      this.employeeList = [];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["$key"] = element.key;
        this.employeeList.push(y as Employee);
        console.log(this.employeeList)
      });
    });

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
      image: ['', Validators.required],
      keywords: ['', [Validators.required, Validators.minLength(5)]],


    })

  }
  private addUsersData() {
    console.log(this.postAdd.value);
    console.log(this.uid);
    

    // if (this.selectedFiles.item(0))
      this.uploadpic();


      this.postAdd.patchValue({
        image: this.uniqkey1
      })
      
    //   let itemsRef = this.db.list('/Posted_Ads/' + this.uid + '/');
    let itemsRef = this.db.list('/Posted_Ads/');
    if (itemsRef.push(this.postAdd.value))
      alert('Added !');


  }
  chooseFiles(event) {
    this.selectedFiles = event.target.files;

  }
  

  uploadpic() {
    let file = this.selectedFiles.item(0);
    let uniqkey = 'pic' + Math.floor(Math.random() * 1000000);
    const uploadTask = this.storage.upload('/Posted-Add/'+uniqkey, file);
    this.uniqkey1 = uniqkey;
    //    this.imgsrc = uploadTask.downloadURL();

    uploadTask.percentageChanges().subscribe((value) => {
      this.progressBarValue = value.toFixed(2);
    })
  }


}
