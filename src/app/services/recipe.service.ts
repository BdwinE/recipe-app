//import { EventEmitter } from '@angular/core';
import { Recipe } from '../recipe/recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class RecipeService {
  //selectedRecipeEmitter = new EventEmitter<Recipe>();
  //updateRecipeEmitter = new EventEmitter<Recipe[]>();
  //selectedRecipeEmitter = new Subject<Recipe>();
  updateRecipeEmitter = new Subject<Recipe[]>();
  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Gumbo',
  //     'rice, shrimp, stew',
  //     'https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_1:1/k%2FPhoto%2FSeries%2F2023-01-how-to-make-cajun-gumbo%2F2022-how-to-make-cajun-gumbo__925',
  //     [
  //       new Ingredient('rice', 1),
  //       new Ingredient('shrimp', 10),
  //       new Ingredient('stew', 1),
  //     ]
  //   ),
  //   new Recipe(
  //     'Fried Chicken',
  //     'Fried Chicken with a crispy skin',
  //     'https://www.jocooks.com/wp-content/uploads/2019/03/fried-chicken-1-5.jpg',
  //     [new Ingredient('chicken', 1), new Ingredient('oil', 1)]
  //   ),
  // ];

  private recipes: Recipe[] = [];
  getRecipeById(id: number): Recipe {
    return this.recipes[id];
  }
  getRecipeByName(name: string): Recipe {
    return this.recipes.find((recipe) => {
      return name === recipe.name ? true : false;
    });
  }
  getRecipeIndex(recipeToFind: Recipe): number {
    return this.recipes.findIndex((recipe) => {
      return recipe.name === recipeToFind.name ? true : false;
    });
  }
  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }
  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    //this.updateRecipeEmitter.emit(this.recipes.slice());
    this.updateRecipeEmitter.next(this.recipes.slice());
  }
  removeRecipe(recipeToRemove: Recipe) {
    this.recipes = this.recipes.filter((recipe) => {
      recipe.name != recipeToRemove.name;
    });
  }
  removeIngredient(recipe: Recipe, ingredientIndex: number): Recipe {
    const recipeToEditIndex = this.recipes.findIndex((recipe2) => {
      return recipe2.name === recipe.name;
    });
    this.recipes[recipeToEditIndex].ingredients.splice(ingredientIndex, 1);
    //this.updateRecipeEmitter.emit(this.recipes.slice());
    this.updateRecipeEmitter.next(this.recipes.slice());
    return this.recipes[recipeToEditIndex];
  }

  updateRecipe(oldRecipe: Recipe, newRecipe: Recipe) {
    const recipeToEditIndex = this.recipes.findIndex((recipe2) => {
      return recipe2.name === oldRecipe.name;
    });

    this.recipes[recipeToEditIndex] = newRecipe;
    //this.updateRecipeEmitter.emit(this.recipes.slice());
    this.updateRecipeEmitter.next(this.recipes.slice());
  }
  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.updateRecipeEmitter.next(this.recipes.slice());
  }
  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.updateRecipeEmitter.next(this.recipes.slice());
  }
}
