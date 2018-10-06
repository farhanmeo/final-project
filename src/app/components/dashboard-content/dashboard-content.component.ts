import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { EmployeeService } from '../crud/shared/list.service';
import { Router } from '@angular/router';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { Employee } from '../crud/shared/list.model';

@Component({
  selector: 'app-dashboard-content',
  templateUrl: './dashboard-content.component.html',
  styleUrls: ['./dashboard-content.component.css'],
  providers: [EmployeeService],
})
export class DashboardContentComponent implements OnInit {
  employeeList: Employee[];

  data: Observable<any[]>;
  uid: string;

  constructor(private db: AngularFireDatabase,public afAuth: AngularFireAuth,private employeeService: EmployeeService, private router: Router,private storage: AngularFireStorage) {
    this.afAuth.authState.subscribe((auth) => {
      this.uid = auth.uid;
      this.data = db.list('/Posted_Ads/' + auth.uid + '/').valueChanges();      
      this.data.subscribe(data => {
        console.log(this.uid);
      });
      console.log(this.employeeList);
      
    });
    
   }

  ngOnInit() {
  }

}
