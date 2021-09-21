import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {


  constructor( private dataStorageService: DataStorageService, private authService: AuthService ) { }
  private usersub:Subscription;
  isauthenticated:boolean = false;
  ngOnInit(): void {
    this.usersub = this.authService.user.subscribe( user => {
      this.isauthenticated = !user ? false : true;
    });
  }
  onSendData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogOut() {
     this.authService.logOut();
  }

  ngOnDestroy():void {
    this.usersub.unsubscribe();
  }
  
  
}
