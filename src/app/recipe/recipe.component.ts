import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css'],
  providers: [],
})
export class RecipeComponent implements OnInit {
  recipeSelected: Recipe;

  ngOnInit(): void {
    // this.recipeService.selectedRecipeEmitter.subscribe((recipe: Recipe) => {
    //   this.recipeSelected = recipe;
    // });
  }

  constructor(private recipeService: RecipeService) {}
}
