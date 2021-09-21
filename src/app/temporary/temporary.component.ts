import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Post } from './post.model';
import { PostService } from './posts.service';


@Component({
  selector: 'app-temporary',
  templateUrl: './temporary.component.html',
  styleUrls: ['./temporary.component.css']
})
export class TemporaryComponent implements OnInit {

  constructor( private htttp:HttpClient,private postService: PostService ) { }
  genders = ['male','female'];
  signUpForm:FormGroup;
  forbiddenUsername:string[] = ['fayed','anik'];
  nameisForbidden:boolean;
  isfetching:boolean = false;
  userdata:Post[] = [];
  iserror = null;

  ngOnInit(): void {
    this.nameisForbidden = false;
    this.signUpForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null,[Validators.required,this.fobiddenNames.bind(this)]),
        'email': new FormControl(null,[Validators.required,Validators.email],this.forbiddenEmails)
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });

    this.onFetchPost();
  }

  onsubmit() {
    var postData = {
      'userName':this.signUpForm.controls['userData'].value.username,
      'userEmail':this.signUpForm.controls['userData'].value.email
    }
    this.postService.createAndStorePost(postData.userName,postData.userEmail)
    .subscribe( ()=> {
      this.fetchData();
    });
  }

  onFetchPost() {
    this.fetchData();
  }

  private fetchData() {
    this.isfetching = true;
    const fetchedData = this.postService.fetchPost();
    fetchedData.subscribe(
      posts => {
        this.isfetching = false;
        this.userdata = posts;
      }, error => {
          this.iserror = error.statusText;
      });
  }

  onClear() {
    this.postService.clearData().subscribe( () => {
      this.userdata = [];
    });
  }

  onAddHobby() {
    const control = new FormControl(null,Validators.required);
    (<FormArray>this.signUpForm.get('hobbies')).push(control);
  }

  getControls() {
    return (<FormArray>this.signUpForm.get('hobbies')).controls;
  }
  
  fobiddenNames( control:FormControl ):{[s:string]:boolean} {
    if( this.forbiddenUsername.indexOf(control.value) != -1 ) {
      return {'nameIsforbidden':true};
    }
    else {
      return null;
    }
  }

  forbiddenEmails( control:FormControl ): Promise<any> | Observable<any> {
    const promise = new Promise<any>( (resolve,reject) => {
      setTimeout( ()=> {
        if( control.value==="test@test.com"){
          resolve({'emailIsForbidden':true}); 
        }
        else {
          resolve(null);
        }
      },1000);
    });
    return promise;
  }

}
