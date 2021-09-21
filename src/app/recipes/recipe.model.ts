import { Ingredient } from "../shared/ingredient.model";


export class Recipe {
    public name: string;
    public description: string;
    public imageName: string;
    public ingredient: Ingredient[];

    constructor( name:string,desc:string,imageName:string,ingredient:Ingredient[]) {
        this.name =  name;
        this.description =  desc;
        this.imageName =  imageName;
        this.ingredient = ingredient;
    }
}