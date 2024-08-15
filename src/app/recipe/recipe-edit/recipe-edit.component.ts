import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { RecipeService } from 'src/app/services/recipe.service';
import { __values } from 'tslib';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  fG: FormGroup;
  editMode = false;
  recipe: Recipe;
  id: number; //for edit mode

  onSubmitNewRecipe() {
    console.log('submitted');
    console.log(this.fG);

    const name = this.fG.get('recipeFG').get('recipeName').value;
    const recipeDescription = this.fG
      .get('recipeFG')
      .get('recipeDescription').value;
    const imagePath = this.fG.get('recipeFG').get('recipeImagePath').value;
    const ingredients = this.fG
      .get('ingredientsFG')
      .get('recipeIngredientsArray')
      .value.filter((ingredientNotRemovedFC) => {
        return !ingredientNotRemovedFC.remove ? true : false;
      })
      .map((ingredientFC) => {
        return new Ingredient(ingredientFC.name, ingredientFC.amount);
      });

    const newRecipe = new Recipe(
      name,
      recipeDescription,
      imagePath,
      ingredients
    );

    this.editMode
      ? this.rescipeService.updateRecipe(this.recipe, newRecipe)
      : this.rescipeService.addRecipe(newRecipe);

    this.router.navigate(['../'], { relativeTo: this.route });
  }

  addIngredientToList(name: string, amount: string) {
    (<FormArray>(
      this.fG.get('ingredientsFG').get('recipeIngredientsArray')
    )).push(
      new FormControl({
        name: name,
        amount: amount,
        added: true,
        remove: false,
      })
    );
    this.fG.get('ingredientsFG').get('ingredientName').reset();
    this.fG.get('ingredientsFG').get('ingredientAmount').reset();
  }

  removeIngredient(index: number) {
    let removedFC = (<FormArray>(
      this.fG.get('ingredientsFG').get('recipeIngredientsArray')
    )).at(index).value;

    let newFC = new FormControl({
      name: removedFC.name,
      amount: removedFC.amount,
      added: removedFC.added,
      remove: !removedFC.remove,
    });

    (<FormArray>(
      this.fG.get('ingredientsFG').get('recipeIngredientsArray')
    )).removeAt(index);

    (<FormArray>(
      this.fG.get('ingredientsFG').get('recipeIngredientsArray')
    )).insert(index, newFC);
  }

  setEditMode() {
    console.log('in edit mode');
    this.recipe = this.rescipeService.getRecipeById(this.id);

    for (let i = 0; i < this.recipe.ingredients.length; i++) {
      //create form controls array for recipes
      (<FormArray>(
        this.fG.get('ingredientsFG').get('recipeIngredientsArray')
      )).push(
        new FormControl({
          name: this.recipe.ingredients[i].name,
          amount: this.recipe.ingredients[i].amount,
          added: false,
          remove: false,
        })
      );
    }

    this.fG.patchValue({
      recipeFG: {
        recipeName: this.recipe.name,
        recipeDescription: this.recipe.description,
        recipeImagePath: this.recipe.imagePath,
      },

      ingredientsFG: {
        ingredientName: null,
        ingredientAmount: null,
      },
    });
  }

  getIngredientControls() {
    return (
      this.fG.get('ingredientsFG').get('recipeIngredientsArray') as FormArray
    ).controls;
  }

  setNewMode() {
    this.fG.reset();
  }

  ngOnInit() {
    this.fG = new FormGroup({
      recipeFG: new FormGroup({
        recipeName: new FormControl(null, [Validators.required]),
        recipeDescription: new FormControl(null, [Validators.required]),
        recipeImagePath: new FormControl(null, [Validators.required]),
      }),

      ingredientsFG: new FormGroup({
        ingredientName: new FormControl(null, [Validators.required]),
        ingredientAmount: new FormControl(null, [
          Validators.required,
          Validators.min(1),
        ]),
        recipeIngredientsArray: new FormArray(
          [],
          this.ingredientsNotEmptyValidator.bind(this)
        ),
      }),
    });

    this.route.params.subscribe((params: Params) => {
      this.id = Number(params['id']);
      this.editMode = params['id'] !== undefined;
      console.log(this.editMode);
      if (this.editMode) this.setEditMode();
      else this.setNewMode();
    });
  }

  ingredientsNotEmptyValidator(
    formArray: FormArray
  ): { [s: string]: boolean } | null {
    let ingredientsCount = 0;
    const array = formArray.value;
    for (let i = 0; i < array.length; i++) {
      if (!array[i].remove) ingredientsCount++;
    }

    return ingredientsCount <= 0 ? { emptyIngredientsForbidden: true } : null;
  }
  constructor(
    private route: ActivatedRoute,
    private rescipeService: RecipeService,
    private router: Router
  ) {}
}
