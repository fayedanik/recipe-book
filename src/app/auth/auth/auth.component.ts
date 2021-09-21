import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { authResponseData, AuthService } from '../auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor( private authService: AuthService,private route:Router ) { }

  isloginmode:boolean = true;
  authform:FormGroup;
  hide:boolean = true;
  isloading:boolean = false;
  error:string = null;

  ngOnInit(): void {
    this.authform = new FormGroup({
      'email': new FormControl(null,[Validators.required,Validators.email]),
      'password': new FormControl(null,[Validators.required,Validators.minLength(6)])
    });
  }

  onSwitch() {
    this.isloginmode = !this.isloginmode;
  }

  onSubmit() {
    this.isloading = true;
    const email = this.authform.value['email'];
    const password = this.authform.value['password'];

    let authObs: Observable<authResponseData>;

    if( this.isloginmode ) {
      authObs = this.authService.login(email,password);
    } else {
      authObs = this.authService.signUp(email,password);
    }
    authObs.subscribe(
      resData => {
        //console.log(resData);
        this.isloading = false;
        this.route.navigate(['/recipes']);
      },
      errorMessage => {
        this.error = errorMessage;
        this.isloading = false;
      }
    );
    setTimeout(() => {
      this.error = null;
    }, 3000);

    this.authform.reset();
  }
}
