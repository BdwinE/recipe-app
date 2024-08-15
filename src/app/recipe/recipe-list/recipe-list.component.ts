import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = this.recipeService.getRecipes();
  recipesSubscription: Subscription;
  // recipeSelected(recipe: Recipe) {
  //   this.recipeService.selectedRecipeEmitter.emit(recipe);
  // }

  constructor(private recipeService: RecipeService) {}
  ngOnDestroy(): void {
    this.recipesSubscription.unsubscribe();
  }
  ngOnInit(): void {
    this.recipesSubscription = this.recipeService.updateRecipeEmitter.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    );
  }
}
