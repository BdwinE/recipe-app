import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeService } from '../services/recipe.service';
import { Recipe } from '../recipe/recipe.model';
import { exhaustMap, take, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put(
        'https://recipe-app-project-98dbb-default-rtdb.firebaseio.com/recipes.json',
        recipes
      )
      .subscribe((res) => {
        console.log(res);
      });
  }

  fecthData() {
    return this.http
      .get(
        'https://recipe-app-project-98dbb-default-rtdb.firebaseio.com/recipes.json'
      )
      .pipe(
        tap((recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        })
      );
    // return this.http
    //   .get(
    //     'https://recipe-app-project-98dbb-default-rtdb.firebaseio.com/recipes.json'
    //   )
    //   .pipe(
    //     tap((recipes: Recipe[]) => {
    //       this.recipeService.setRecipes(recipes);
    //     })
    //   );
  }
}
