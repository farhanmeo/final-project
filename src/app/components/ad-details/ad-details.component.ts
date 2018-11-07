import { Component, OnInit } from '@angular/core';
import { Employee } from '../crud/shared/list.model';
import { AngularFireDatabase } from 'angularfire2/database';
import { EmployeeService } from '../crud/shared/list.service';


@Component({
  selector: 'app-ad-details',
  templateUrl: './ad-details.component.html',
  styleUrls: ['./ad-details.component.css'],
  providers: [EmployeeService],
})
export class AdDetailsComponent implements OnInit {
  ad: Employee[];
  detail: any[];
  ads: any[];
  change:string = "overview";

  constructor(private db: AngularFireDatabase, private es: EmployeeService) { 
  }
  ngOnInit() {
    

    console.log(this.es.getAdd());
    this.ads = this.es.getAdd();
    console.log("data =>",this.ads);
  }

  tabChange(val){
    this.change = val
  }
  booking(pTime:string,pDate:string,rTime:string,rDate:string){
    console.log("i am here =>", pTime,pDate,rTime,rDate);
  


    
  }
}
