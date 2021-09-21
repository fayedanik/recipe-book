import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class FileUploadService {

  private basePath = '/Uploads';
  private fullPath:string;
  constructor( private aFStorage:AngularFireStorage ) { }



  publishFiletoStorage( file:File ) {
    const fileName = Math.random()+file.name;
    const filePath = this.basePath + "/"+fileName;
    const storageRef = this.aFStorage.ref(filePath);
    const uploadFile = this.aFStorage.upload(filePath,file).snapshotChanges().pipe(
      finalize( ()=> {
        storageRef.getDownloadURL().subscribe( (url) => {
          this.fullPath = url;
        })
      })
    ).subscribe();
    return this.fullPath;
  }

  getfullPath() {
    return this.fullPath;
  }
}

