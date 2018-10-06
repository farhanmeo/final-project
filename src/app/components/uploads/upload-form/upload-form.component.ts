import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import { switchMap, finalize, filter } from 'rxjs/operators';
@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.css'],
})
export class UploadFormComponent implements OnInit {
  title = 'app';
  selectedFiles: FileList;
  file: File;
  imgsrc;
  color: string = 'primary';
  mode: 'determinate';
  progressBarValue;

  constructor(private storage: AngularFireStorage) {

  }

  chooseFiles(event) {
    this.selectedFiles = event.target.files;
    if (this.selectedFiles.item(0))
      this.uploadpic();  
  }

  uploadpic() {
    let file = this.selectedFiles.item(0);
    let uniqkey = 'pic' + Math.floor(Math.random() * 1000000);
    const uploadTask = this.storage.upload('/pictures/' + uniqkey, file);
    const ref = this.storage.ref('Posted-Add/images');

//    this.imgsrc = uploadTask.downloadURL();
// uploadTask.snapshotChanges().pipe(
//   finalize(() => this.imgsrc = ref.getDownloadURL() )
// )

if(uploadTask){
    const ref = this.storage.ref('/pictures/' + uniqkey);
    //this.task = ref.put(file, {customMetadata})
    this.imgsrc = uploadTask.snapshotChanges().pipe(
      //filter(snap => snap.state === this.storage.TaskState.SUCCESS)
      switchMap(() => ref.getDownloadURL())
    )
    console.log(this.imgsrc);
        //  uploadTask.snapshotChanges().pipe(
        // finalize(() => this.imgsrc = ref.getDownloadURL() )
        // )

  }
//    this.imgsrc =  firebase.storage().ref().child('Posted-Add/images').getDownloadURL()
  console.log(this.imgsrc);
    uploadTask.percentageChanges().subscribe((value) => {
      this.progressBarValue = value.toFixed(2);
    })
  }
  ngOnInit() {
  }

}
