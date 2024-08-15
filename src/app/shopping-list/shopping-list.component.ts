import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../services/shopping-list.service';
import { Subscription } from 'rxjs';
import { LoggingService } from '../services/logging.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: 'shopping-list.component.html',
  providers: [],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = this.shoppingListService.getIngrdients();
  shoppingListSubscription: Subscription;

  onEditItem(i: number) {
    this.shoppingListService.starteEditing.next(i);
  }

  ngOnInit(): void {
    this.shoppingListSubscription =
      this.shoppingListService.ingredientsChangedEmitter.subscribe(
        (ingredients: Ingredient[]) => {
          this.ingredients = ingredients;
        }
      );

    this.loggingService.printLog('Hello From Shopping List Component');
  }
  constructor(
    private shoppingListService: ShoppingListService,
    private loggingService: LoggingService
  ) {}
  ngOnDestroy(): void {
    this.shoppingListSubscription.unsubscribe();
  }
}
