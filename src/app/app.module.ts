import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon'
import { HeaderComponent } from './header/header.component';
import { MatListModule } from '@angular/material/list';



import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ShoppingListService } from './shopping-list/shopping-list.service';
import { AppRoutingModule } from './app-routing.module';

import { MatSelectModule } from '@angular/material/select'; 
import { TemporaryComponent } from './temporary/temporary.component';
import { MatMenuModule } from '@angular/material/menu';
import { RecipeService } from './recipes/recipe.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AngularFireStorageModule } from '@angular/fire/storage'
import { AngularFireModule } from '@angular/fire'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthInterceptorService } from './auth/auth/auth-interceptor.sevice';
import {MatSidenavModule} from '@angular/material/sidenav';

import { AuthModule } from './auth/auth/auth.module';

// import { RecipesComponent } from './recipes/recipes.component';
// import { RecipesItemComponent } from './recipes/recipes-list/recipes-item/recipes-item.component';
// import { RecipesListComponent } from './recipes/recipes-list/recipes-list.component';
// import { RecipesDetailComponent } from './recipes/recipes-detail/recipes-detail.component';
// import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
// import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TemporaryComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatSelectModule,
    MatMenuModule,
    HttpClientModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyDcuTjEztzZhcyaScPTNp4xD76l8RVm2l4",
      authDomain: "recipe-book-6e2aa.firebaseapp.com",
      databaseURL: "https://recipe-book-6e2aa-default-rtdb.firebaseio.com",
      projectId: "recipe-book-6e2aa",
      storageBucket: "recipe-book-6e2aa.appspot.com",
      messagingSenderId: "893773677871",
      appId: "1:893773677871:web:6e9727f2b93e6406998dda",
      measurementId: "G-YGLXTPD90T"
    }),
    MatProgressSpinnerModule,
    NgbModule,
    MatSidenavModule,
    AuthModule
  ],
  exports: [
    MatSidenavModule
  ],
  providers: [
    ShoppingListService,
    RecipeService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService, 
       multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
