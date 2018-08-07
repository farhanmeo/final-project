import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
// import * as firebase from 'firebase/app';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  username: any;
  email: any;
  password: any;
  courses: any[];
  users: any[];

  constructor(private db: AngularFireDatabase, public afAuth: AngularFireAuth, private router: Router) {
    db.list('/users').valueChanges().subscribe(users => {
      this.users = users;
      console.log(this.users);

    });
  }
  private addUsersData(email:string,password:string,username:String){
   const itemsRef = this.db.list('users');
itemsRef.push({username: username, email: email,password:password });   
  }

  Register() {
    this.afAuth.auth.createUserWithEmailAndPassword(this.email, this.password).then(x => {
     this.addUsersData(this.email,this.password,this.username)
     this.router.navigate(['/dashboard'])
     alert('Registration Successful !');
      
    }).catch(err => {
      
      //      Observable.throw(Error || 'Internal Server error');
            alert('Registration Failed !');
            
         });
  }
  logout() {
    this.afAuth.auth.signOut();
  }

  ngOnInit() {
  }

}
