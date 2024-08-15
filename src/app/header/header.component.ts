import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(
    private recipeHttpService: DataStorageService,
    private authService: AuthService
  ) {}

  loggedIn: boolean = false;
  userSub: Subscription;
  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user) => {
      if (user) this.loggedIn = true;
      else this.loggedIn = false;
    });
  }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
  onSaveData() {
    this.recipeHttpService.storeRecipes();
    console.log('data saved');
  }
  onFetchData() {
    this.recipeHttpService.fecthData().subscribe();
  }

  onLogOut() {
    if (this.loggedIn) this.authService.logOut();
  }
}
