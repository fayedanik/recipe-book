
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


//import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const appRoutes: Routes = [
    { path:'', redirectTo:'/recipes', pathMatch:'full' },
    { path:'recipes', loadChildren: () => import('./recipes/recipes.module').then( m => m.RecipesModule) },
    { path:'shopping-list',loadChildren: () => import('./shopping-list/shopping-list.module').then( m => m.ShoppingListModule ) },
    { path:'auth', loadChildren: () => import('./auth/auth/auth.module').then( m =>m.AuthModule ) } 
    //{ path:'shopping-list', component: ShoppingListComponent},
    // { path:'temporary', component:TemporaryComponent },
    //{ path:'auth', component:AuthComponent }
    //{ path:'**', component: RecipeStartComponent}
];

@NgModule({
    imports:[RouterModule.forRoot(appRoutes,{preloadingStrategy:PreloadAllModules})],
    exports:[RouterModule]
}) 

export class AppRoutingModule {
    
}