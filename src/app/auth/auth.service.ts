import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { User } from './auth/user.model';
import { Router } from '@angular/router';
import { RecipeService } from '../recipes/recipe.service';
import { environment } from 'src/environments/environment';


export interface authResponseData {
  idToken:string,
  email:string,
  refreshToken:string,
  expiresIn:string,
  localId:string,
  registered?:boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject<User>(null);
  constructor( private http: HttpClient , private router:Router, private recipeService: RecipeService) { }
  private tokenExpirationTimer: any;

  public signUp( email:string, password:string ) {
    return this.http
      .post<authResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+environment.firabaseApiKey,
        {
          email: email,
          password: password,
          returnSecureToken:true
        }
      )
      .pipe(catchError(errorRes => {
        let errorMessage = 'An unknown error occurred';
        if( !errorRes.error || !errorRes.error.error) {
          return throwError(errorMessage);
        }
        errorMessage = this.handleError(errorRes.error.error.message);
        return throwError(errorMessage);
      }),tap( resData => {
        const expirationDate = new Date( new Date().getDate() + +resData.expiresIn * 1000);
        const user = new User( 
          resData.email,
          resData.localId,
          resData.idToken,
          expirationDate
        );
        this.user.next(user);
      })
    );
  }

  public login( email:string,password:string ) {
    return this.http
      .post<authResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+environment.firabaseApiKey,
        {
          email: email,
          password: password,
          returnSecureToken:true
        }
      )
      .pipe( catchError( errorRes => {
        let errorMessage = 'An unknown error occurred';
        if( !errorRes.error || !errorRes.error.error) {
          return throwError(errorMessage);
        }
        errorMessage = this.handleError(errorRes.error.error.message);
        return throwError(errorMessage);
      }),tap( resData => {
          this.handleAunthentication(resData.email,resData.localId,resData.idToken,+resData.expiresIn);
        })
      );
  }

  public AutoLogin() {
    const userData:{
      email: string;
      id:string;
      _token:string;
      _tokenExpirationDate:string;
    } = JSON.parse(localStorage.getItem('userData'));

    if( !userData ) {
      //console.log("bug");
      return;
    } else {
      const loadedUser = new User( userData.email,userData.id,userData._token,new Date( userData._tokenExpirationDate) );
      if( loadedUser.token ) {
        const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
        //console.log(expirationDuration);
        this.user.next(loadedUser);
        this.AutoLogOut(expirationDuration);
      }
    }
  }

  public logOut() {
    localStorage.removeItem('userData');
    this.recipeService.setRecipes([]);
    this.user.next(null);
    if( this.tokenExpirationTimer ) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
    this.router.navigate(['/auth']);
  }

  public AutoLogOut( expirationDuration:number ) {
    console.log( expirationDuration );
    this.tokenExpirationTimer = setTimeout( () => {
      this.logOut();
    },expirationDuration);

  }

  private handleAunthentication( email:string, userID:string, idToken: string, expiresIn: number ) {
    const expirationDate = new Date( new Date().getTime() + expiresIn * 1000 );
    const user = new User( email,userID,idToken,expirationDate );
    this.user.next(user);
    this.AutoLogOut(expiresIn*1000);
    localStorage.setItem('userData',JSON.stringify(user));
  }

  private handleError( errorMessage:string ) {
    let errormessage = 'An unknown error occurred';
    switch (errorMessage) {
      case 'EMAIL_EXISTS':
        errormessage = 'This email exists already';
        break;
      case 'OPERATION_NOT_ALLOWED':
        errormessage = 'Signin is disabled for you!';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errormessage = 'Too many atempts! Try again later';
        break;
      case 'EMAIL_NOT_FOUND':
        errormessage = 'Email Not Found!';
        break;
      case 'INVALID_PASSWORD':
        errormessage = 'Email or Password is wrong';
        break;
      case 'USER_DISABLED':
        errormessage = 'User is disabled!';
    }
    return errormessage;
  }
}


