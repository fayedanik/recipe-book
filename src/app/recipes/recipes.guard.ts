import { Injectable } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Params, Router, RouterStateSnapshot } from "@angular/router";
import { Observable, pipe } from "rxjs";
import { RecipeService } from "./recipe.service";

@Injectable({providedIn:'root'})

export class RecipesGuard implements CanActivate {

    id:number;
    constructor( private recipeService: RecipeService,private router:Router ) {}

    canActivate( route:ActivatedRouteSnapshot , state:RouterStateSnapshot ):boolean {
        this.id = +route.paramMap.get('id');
        if( this.recipeService.getRecipe(this.id)===undefined ) {
            this.router.navigate(['../recipes']);
            return false;
        }
        return true;
    }
}