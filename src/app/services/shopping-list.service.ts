import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListService {
  //ingredientsChangedEmitter = new EventEmitter<Ingredient[]>();
  ingredientsChangedEmitter = new Subject<Ingredient[]>();
  starteEditing = new Subject<number>();
  private ingredients: Ingredient[] = [
    new Ingredient('Apple', 5),
    new Ingredient('Tomatoes', 10),
  ];

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    //this.ingredientsChangedEmitter.emit(this.ingredients.slice());
    this.ingredientsChangedEmitter.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients = this.ingredients.concat(ingredients);
    //this.ingredientsChangedEmitter.emit(this.ingredients.slice());
    this.ingredientsChangedEmitter.next(this.ingredients.slice());
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientsChangedEmitter.next(this.ingredients.slice());
  }
  removeIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChangedEmitter.next(this.ingredients.slice());
  }

  getIngrdients(): Ingredient[] {
    return this.ingredients.slice();
  }
  getIngredient(index: number): Ingredient {
    return this.ingredients[index];
  }
}
