import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Ingredient } from '../../shared/ingredient.model';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFireStorage } from '@angular/fire/storage';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { finalize } from 'rxjs/operators'
@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  id:number;
  showMessage:string;
  editMode = false;
  descriptionLength:number;
  selectedFile:File = null;
  imagePath:string;
  fullPath:string;
  temp_ingredient: Ingredient[];
  paramsubsciption: Subscription;

  constructor(
    private route: ActivatedRoute,
    private recipeService:RecipeService,
    private router:Router,
    private _snackBar: MatSnackBar,
    private aFStorage:AngularFireStorage,
    private flservice:FileUploadService) { }


  recipeForm:FormGroup;

  ngOnInit(): void {
    this.imagePath = null;
    this.fullPath = null;
    this.temp_ingredient = [];
    this.descriptionLength = 0;
    this.paramsubsciption = this.route.params
    .subscribe(
      (params:Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
        //console.log(this.editMode);
      }
    );
  }

  private initForm() {

    let recipeName = '';
    let recipeImageName = '';
    let recipeDesc = '';
    let recipeIngredients = new FormArray([]);

    if( this.editMode ) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImageName = recipe.imageName;
      recipeDesc = recipe.description;
      this.descriptionLength = recipe.description.length;
      if ( recipe['ingredient'] ) {
        for ( let ingredient of recipe.ingredient ) {
          recipeIngredients.push(
            new FormGroup({
              'ingredientName': new FormControl(ingredient.name,Validators.required),
              'ingredientAmount': new FormControl(ingredient.amount,[
                Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      'recipeName': new FormControl(recipeName,Validators.required),
      'imageName': new FormControl( null,Validators.required),
      'image': new FormControl(),
      'description' : new FormControl( recipeDesc,[
        Validators.required,Validators.maxLength(500)
      ]),
      'ingredients' : recipeIngredients
    });
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'ingredientName': new FormControl(null,Validators.required),
        'ingredientAmount': new FormControl(null,[
          Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  onDeleteIngredient( index:number ) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  getcontrols() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  get ingredientControls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  openSnackBar( message:string,action ) {
    this._snackBar.open(message,action,{
      duration:3000,
      panelClass:['mat-toolbar','mat-primary']
    });
  }
  
  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePath = reader.result as string;
    }
    reader.readAsDataURL(this.selectedFile);
    //console.log(this.selectedFile);
  }

  onSubmit() {
    //console.log(this.recipeForm.controls.description.value.length);
    //console.log(this.recipeForm.value['ingredients'].length);
    //Ingredients:Ingredient[] = [new Ingredient(null,null)];
    //this.angularfirestorage.upload("/files"+Math.random()+this.selectedFile,this.selectedFile);
    
    const fileName = Math.random()+this.selectedFile.name;
    const filePath = "/Uploads" + "/"+ fileName;
    const storageRef = this.aFStorage.ref(filePath);
    const uploadFile = this.aFStorage.upload(filePath,this.selectedFile).snapshotChanges().pipe(
      finalize( ()=> {
        storageRef.getDownloadURL().subscribe( (url) => {
          this.fullPath = url;
          for( var i = 0;i<this.recipeForm.value['ingredients'].length;i++) {
            this.temp_ingredient.push(new Ingredient(this.recipeForm.value['ingredients'][i].ingredientName,this.recipeForm.value['ingredients'][i].ingredientAmount))
          }
          const newRecipe = new Recipe(
            this.recipeForm.value['recipeName'],
            this.recipeForm.value['description'],
            this.fullPath,
            this.temp_ingredient
          );
          if( this.editMode ) {
            this.recipeService.updateRecipe(this.id,newRecipe);
          } else {
            this.recipeService.addRecipe(newRecipe);
          }
          if( this.editMode ) {
            this.showMessage = 'Recipe Updated';
          }
          else {
            this.showMessage = 'Recipe Added';
          }
      
          this.openSnackBar(this.showMessage,'Dismiss');

          this.onClear();

        })
      })
    ).subscribe();
  }

  onClear() {
    this.router.navigate(['../'],{relativeTo:this.route});
  }

  ngOnDestroy() {
    this.paramsubsciption.unsubscribe();
  }
}
