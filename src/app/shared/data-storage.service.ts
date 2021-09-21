import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { map, tap } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";
import { User } from "../auth/auth/user.model";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";


@Injectable({providedIn:'root'})

export class DataStorageService {

    constructor( private http:HttpClient,private recipeService:RecipeService,private authService: AuthService ) {}
    currentUser:User = null;
    isfetching = new Subject<number>();
    storeRecipes() {
        this.getUser();
        const recipes = this.recipeService.getRecipes();
        this.http.put('https://recipe-book-6e2aa-default-rtdb.firebaseio.com/recipes/'+this.currentUser.id+'.json',recipes)
        .subscribe( response => {
            //console.log( response );
        })
    }

    fetchRecipes() {
        this.getUser();
        //console.log(this.currentUser.id);
        this.isfetching.next(1);
        return this.http.get<Recipe[]>('https://recipe-book-6e2aa-default-rtdb.firebaseio.com/recipes/'+this.currentUser.id+'.json')
        .pipe( 
            map( recipes => {
                if( recipes ) {
                    return recipes.map( recipe => {
                        return { ...recipe,ingredients: recipe.ingredient ? recipe.ingredient : [] };
                    });
                }
            }),
            tap( recipes => {
                if( recipes ) {
                    this.recipeService.setRecipes( recipes );
                }
                this.isfetching.next(2);
            })
        )
    }

    getUser() {
        return this.authService.user.subscribe( user => {
            this.currentUser = user;
        })
    }
}



