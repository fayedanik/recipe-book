import { Component,OnInit,Output,EventEmitter, ElementRef, NgModule, OnDestroy, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {

  subscription: Subscription;
  @Output()ingredientClear = new EventEmitter<string>();

  editingmode:boolean = false;
  editingIndex:number;
  editedIngredient: Ingredient;

  @ViewChild('f') slForm:NgForm;

  constructor( private slService:ShoppingListService) { }
  
  ngOnInit(): void {
    this.subscription = this.slService.startEditing
    .subscribe((index:number) =>{
      this.editingmode = true;
      this.editingIndex = index;
      this.editedIngredient = this.slService.getIngredient(index);
      this.slForm.setValue({
        ingredientName: this.editedIngredient.name,
        ingredientAmount: this.editedIngredient.amount
      });
    });
  }

  onAdditem(form:NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient( value.ingredientName,value.ingredientAmount);
    //console.log(newIngredient);
    if( this.editingmode ) {
      this.slService.updateIngredient(this.editingIndex,newIngredient);
    } else {
      this.slService.addIngredients(newIngredient);
    }
    this.editingmode = false;
    form.resetForm();
  }

  onDelete() {
    this.slService.deletingIngredient(this.editingIndex);
    this.onClear();
  }

  onClear() {
    this.editingmode = false;
    this.slForm.resetForm();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  
}
