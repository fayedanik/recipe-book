import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent implements OnInit {

  recipe:Recipe;
  id:number;
  preLoading:boolean = true;
  constructor( private recipeService:RecipeService,private route:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    const id = this.route.params.subscribe(
      (params:Params) => {
        this.id = +params['id'];
        this.recipe = this.recipeService.getRecipe(this.id);
      }
    );
  }

  onAddShoppingList() {
    this.recipeService.addIngredientToShoppingList(this.recipe.ingredient);
  }

  onEditRecipe() {
    this.router.navigate(['edit'],{relativeTo:this.route});
  }
  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['./recipes']);
  }
}
