import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit, OnDestroy {

  recipes:Recipe[];
  isfetching: Subscription;
  fetchingstate:number = -1;
  private issubscibe: Subscription;

  constructor( private recipeServices:RecipeService, private router:Router, private route: ActivatedRoute,private dataStorageService: DataStorageService ) { }

  ngOnInit(): void {
    
    this.dataStorageService.fetchRecipes().subscribe();
    this.recipes = this.recipeServices.getRecipes();
    //console.log(this.recipes.length);
    this.issubscibe = this.recipeServices.recipeChanged.subscribe(
      (recipes:Recipe[]) => {
        this.recipes = recipes;
      }
    );
    this.isfetching = this.dataStorageService.isfetching.subscribe(
      (fetchingnumber:number) => {
        this.fetchingstate = fetchingnumber;
      }
    );
  }

  onNewRecipe() {
    this.router.navigate(['new'],{relativeTo:this.route});
  }

  ngOnDestroy(): void {
    this.issubscibe.unsubscribe();
    this.isfetching.unsubscribe();
  }
}


