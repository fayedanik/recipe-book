import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatSelectModule } from "@angular/material/select";
import { RouterModule } from "@angular/router";
import { BasicHighlightDirective } from "../basic-highlight/basic-highlight.directive";
import { BetterHighlightDirective } from "../better-highlight/better-highlight.directive";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";



@NgModule({
    declarations:[
        ShoppingListComponent,
        ShoppingEditComponent,
        BasicHighlightDirective,
        BetterHighlightDirective,
    ],
    imports:[
        FormsModule,
        CommonModule,
        MatSelectModule,
        MatListModule,
        MatFormFieldModule,
        MatInputModule,
        RouterModule.forChild([
            { path:'', component: ShoppingListComponent },
        ])
    ]
})

export class ShoppingListModule {

}