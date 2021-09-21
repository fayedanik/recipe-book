import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Recipe } from './recipe.model';


@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: []
})
export class RecipesComponent implements OnInit {
  
  selectedrecipe:Recipe;
  
  private firstObsSubscription: Subscription;
  
  constructor() { }

  ngOnInit(): void {
    

    // const customIntervalObservable = Observable.create((observer:any) => {
    //   let count = 0;
    //   setInterval( ()=>{
    //     observer.next(count);
    //     // if( count>3 ) {
    //     //   observer.error(new Error('New Error Occured as count is greater than 3!'));
    //     // }
    //     count++;
    //   },1000);
    // });

    // this.firstObsSubscription = customIntervalObservable.subscribe( data=> {
    //   //console.log(data);
    // },error => {
    //   //console.log(error.message);
    //   //alert(error.message);
    // });
    
  }

}
