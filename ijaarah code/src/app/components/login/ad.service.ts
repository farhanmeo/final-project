import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database-deprecated';

@Injectable()
export class AdService {

  constructor(private db: AngularFireDatabase) { }

  /// Creates an Ad, then returns as an object
  createAd(): FirebaseObjectObservable<AdListing> {
    const adDefault = new AdListing()
    const adKey = this.db.list('/ads').push(adDefault).key
    return this.db.object('/ads/' + adKey)
  }


  /// Updates an existing Ad
  updateAd(ad: FirebaseObjectObservable<AdListing>, data: any) {
    return ad.update(data)
  }
}
export class AdListing {
  title = 'Your Title'
  content = 'Ad Content'
  price = 5.00
  image = 'http://via.placeholder.com/350x150'
}