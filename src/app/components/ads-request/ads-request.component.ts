import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { EmployeeService} from '../crud/shared/list.service'
@Component({
  selector: 'app-ads-request',
  templateUrl: './ads-request.component.html',
  styleUrls: ['./ads-request.component.css'],
  providers: [EmployeeService],

})
export class AdsRequestComponent implements OnInit {

  ads: any[] = [];
  pendingAds: any[] = [];
  constructor(private ds: EmployeeService,private db: AngularFireDatabase, public afAuth: AngularFireAuth ) { 
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
  }
  approved(ad:any){
    console.log("approved", ad);
    this.ds.updateAd(ad); 
  }
  disApproved(ad:any){
    console.log("disapproved", ad);

  }
}
