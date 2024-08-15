import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;
  ingredients: Ingredient[];

  addIngrsToShoppingList() {
    this.shoppingListService.addIngredients(this.ingredients);
  }
  ngOnInit(): void {
    this.route.params.subscribe((params: Params): void => {
      this.id = params['id'];
      this.recipe = this.recipeService.getRecipeById(this.id);
      this.ingredients = this.recipe.ingredients;
    });
    // this.shoppingListSerive.ingredientsChangedEmitter.subscribe(
    //   (ingredients: Ingredient[]) => {
    //     this.ingredients = ingredients;
    //   }
    // );
  }

  onDelete() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['../'], { relativeTo: this.route });
  }
  constructor(
    private shoppingListService: ShoppingListService,
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService
  ) {}
}
