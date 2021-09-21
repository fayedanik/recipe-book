import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { map, take, tap } from "rxjs/operators";
import { AuthService } from "../auth.service";


@Injectable({providedIn:'root'})

export class AuthGuard implements CanActivate {

    constructor( private authService:AuthService, private router: Router) {}
    
    canActivate( route:ActivatedRouteSnapshot, state:RouterStateSnapshot): boolean | Promise<boolean> | Observable<boolean> {
        return this.authService.user.pipe( take(1),map( user => {
            //return !!user;
            return user===null ?  false: true;
        }), 
        tap( isauth => {
            if( !isauth ) {
                this.router.navigate(['/auth']);
            }
        }));
    }
}