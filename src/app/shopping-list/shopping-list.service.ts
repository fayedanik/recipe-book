import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';
export class ShoppingListService {
    private ingredients:Ingredient[] = [];

    ingredientChanged = new Subject<Ingredient[]>();
    startEditing = new Subject<number>();

    getIngredients() {
        return this.ingredients.slice();
    }

    getIngredient( index:number ) {
        return this.ingredients[index];
    }

    addIngredients(ingredient:Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientChanged.next(this.ingredients.slice());
    }

    addMyIngredient( ingredient:Ingredient[] ) {
        this.ingredients.push(...ingredient);
        this.ingredientChanged.next(this.ingredients.slice());
    }

    onChangeInform(){
        this.ingredients = [];
        this.ingredientChanged.next(this.ingredients.slice());
    }
    
    updateIngredient(index:number,newIngredient : Ingredient) {
        this.ingredients[index] = newIngredient;
        this.ingredientChanged.next(this.ingredients.slice());
    }

    deletingIngredient(index:number) {
        this.ingredients.splice(index,1);
        this.ingredientChanged.next(this.ingredients.slice());
    }
}
