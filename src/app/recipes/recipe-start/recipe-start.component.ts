import { Component, OnInit } from '@angular/core';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-start',
  templateUrl: './recipe-start.component.html',
  styleUrls: ['./recipe-start.component.css']
})
export class RecipeStartComponent implements OnInit {

  fetchingState:number;
  recipes:Recipe[]=[];
  constructor( private dataStorageService: DataStorageService, private recipeService: RecipeService ) { }

  ngOnInit(): void {
    this.dataStorageService.isfetching.subscribe(
      ( fetchingnumber:number ) => {
        this.fetchingState = fetchingnumber;
        this.recipes = this.recipeService.getRecipes();
      }
    );
  }

}
