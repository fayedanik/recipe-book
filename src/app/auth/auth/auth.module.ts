import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { RouterModule } from "@angular/router";
import { LoadingSpinnerComponent } from "src/app/shared/loading-spinner/loading-spinner/loading-spinner.component";
import { AuthComponent } from "./auth.component";


@NgModule({
    declarations:[
        AuthComponent,
        LoadingSpinnerComponent
    ],
    imports:[
        ReactiveFormsModule,
        CommonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        RouterModule.forChild([
            {path:'',component:AuthComponent}
        ])
    ]
})

export class AuthModule {

}