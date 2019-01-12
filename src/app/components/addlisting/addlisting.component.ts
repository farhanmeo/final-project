import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';
import { NgIf } from '@angular/common';
import { Validators, FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';

import { Employee } from '../crud/shared/list.model';
import { EmployeeService } from '../crud/shared/list.service';
import * as firebase from 'firebase';
import { FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { shallowEqualArrays } from '@angular/router/src/utils/collection';
import { AngularFireUploadTask } from 'angularfire2/storage'

interface FeaturedPhotoUrls {
  url1?: string;
  url2?: string;

}
export class Upload {

  $key: string;
  file: File;
  name: string;
  url: string;
  progress: number;
  createdAt: Date = new Date();

  constructor(file: File) {
    this.file = file;
  }
}


@Component({
  selector: 'app-addlisting',
  templateUrl: './addlisting.component.html',
  styleUrls: ['./addlisting.component.css'],
  providers: [EmployeeService]
})
export class AddlistingComponent implements OnInit {

  // featuredPhotoStream: FirebaseObjectObservable<FeaturedPhotoUrls>;
  featuredPhotoStream: AngularFireObject<FeaturedPhotoUrls>;

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
  url: any;
  currentUpload: Employee;
  selectedCategory: boolean = false;

  constructor(
    private employeeService: EmployeeService,
    private storage: AngularFireStorage,
    public fb: FormBuilder,
    private db: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    private router: Router) {
    this.afAuth.authState.subscribe((auth) => {
      this.uid = auth.uid;
      this.data = db.list('/Posted_Ads/' + auth.uid + '/').valueChanges();
      this.data.subscribe(data => {
        console.log(this.uid);
      });
    });
    this.createForm();
    console.log("post add");
    db.list('/Category')
      .valueChanges().subscribe(category => {
        this.sCategory = category;
        console.log(this.sCategory);
      })
    this.featuredPhotoStream = this.db.object('/photos/featured/url1');
    // this.imgsrc =  firebase.storage().ref().child('Posted-Add/images').getDownloadURL()  
    console.log(this.featuredPhotoStream);
  }

  featuredPhotoSelected(event: any) {

    const file: File = event.target.files[0];
    const metaData = { 'contentType': file.type };
    const storageRef: firebase.storage.Reference = firebase.storage().ref(`/photos/featured/url1`);
    const uploadTask: firebase.storage.UploadTask = storageRef.put(file, metaData);
    console.log("Uploading ...", file.name);
    let itemsRef = this.db.list('/photos/featured/url1');
    let url1
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // in progress
        const snap = snapshot as firebase.storage.UploadTaskSnapshot;
        //progress.percentage = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
      },
      (error) => {
        // fail
        console.log('An error had happen');
        console.log(error);
      },
      () => {
        // success

        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          console.log('File available at', downloadURL);
          itemsRef.push(downloadURL);
          url1 = downloadURL;
          console.log(url1);
        });
      }
    );
    this.uniqkey1 = url1;
  }
  ngOnInit() {
    var x = this.employeeService.getCategory();
    x.snapshotChanges().subscribe(item => {
      this.employeeList = [];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["$key"] = element.key;
        this.employeeList.push(y as Employee);
      });
    });
    this.imgsrc = "https://firebasestorage.googleapis.com/v0/b/fir-demo-b87be.appspot.com/o/Posted-pics%2F12may.jpg?alt=media&token=932b45f4-79ca-4e1e-9ba2-18137c72740e";

    this.employeeService.getData();
  }

  createForm() {
    this.postAdd = this.fb.group({
      Category: ['', [Validators.required, Validators.minLength(5)]],
      title: ['', [Validators.required, Validators.minLength(5)]],
      Description: ['', [Validators.required, Validators.minLength(5)]],
      price: [, [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.minLength(5)]],
      phone: [, [Validators.required, Validators.minLength(5)]],
      image: ['', Validators.required],
      keywords: ['', [Validators.required, Validators.minLength(5)]],
      status: ['pending', [Validators.required, Validators.minLength(5)]],
      city: ['pending', [Validators.required, Validators.minLength(5)]],

    })

  }
  private addUsersData(event: any) {

    // this.uploadpic();
    this.postAdd.patchValue({
      image: this.uniqkey1
    })

    let itemsRef = this.db.list('/Posted_Ads/' + this.uid + '/');
    if (itemsRef.push(this.postAdd.value))
      alert(' Added !');
    else {
      alert('Not Added !');
    }

    this.featuredPhotoSelected(event);

  }

  chooseFiles(event) {
    this.selectedFiles = event.target.files;
  }
  uploadpic() {
    let file = this.selectedFiles.item(0);
    let uniqkey = 'pic' + Math.floor(Math.random() * 1000000);
    const uploadTask = this.storage.upload('/Posted-Add/' + uniqkey, file);
    this.uniqkey1 = uniqkey;

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
      message: '',
      image: ''
    }
  }

  //Posting Ad ///////////////////////////


  selectedFilex: FileList;
  currentUploads: Employee;

  detectFiles(event) {
    this.selectedFiles = event.target.files;

  }

  uploadSingle() {
    let file = this.selectedFiles.item(0)
    this.currentUploads = new Employee(file);

    this.pushUpload(this.currentUploads)
  }
  uploads: Observable<Upload[]>;

  pushUpload(upload: Employee) {
    let storageRef = firebase.storage().ref();
    let uniqkey = 'pic' + Math.floor(Math.random() * 1000000);
    // const uploadTask = this.storage.upload('/Posted-Add/'+uniqkey, file);

    let uploadTask = storageRef.child(`photos/featured/${uniqkey}`).put(upload.file);
    let itemsRef = this.db.list(`Posted_Ads/`);
    upload.Category = this.postAdd.get('Category').value;
    upload.title = this.postAdd.get('title').value;
    upload.Description = this.postAdd.get('Description').value;
    upload.status = this.postAdd.get('status').value;
    upload.keywords = this.postAdd.get('keywords').value;
    upload.uid = this.uid;

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
      },
      (error) => {
        console.log("Error => ",error)
      },
      () => {
        // upload success
        console.log("in success");
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          upload.url = downloadURL;
          upload.fileName = upload.file.name
          if (itemsRef.push(upload))
            alert(' Added !');
          else {
            alert('Not Added !');
          }
        });
      }
    );
  }
  // private saveFileData(upload: Employee) {
  //   console.log(upload.fileName);
  //   this.db.list('/Posted_Ads/' + this.uid + '/').push(upload);

  // }
  selectedCat(event){
    console.log("Selected Category", event.target.value);
    this.selectedCategory = true;
    
  }
}
