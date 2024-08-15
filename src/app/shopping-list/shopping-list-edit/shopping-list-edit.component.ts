import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { Ingredient } from 'src/app/shared/ingredient.model';
@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: 'shopping-list-edit.component.html',
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('formGroup') fG: NgForm;
  editSub: Subscription;
  editMode = false;
  editedItemIndex: number;
  editIngredient: Ingredient;
  // submit(name: string, amount: string) {
  //   this.shoppingListService.addIngredient(
  //     new Ingredient(name, Number(amount))
  //   );
  // }

  onSubmit() {
    const name: string = this.fG.form.get('nameInput').value;
    const amount: number = this.fG.form.get('amountInput').value;
    if (this.editMode) {
      this.shoppingListService.updateIngredient(
        this.editedItemIndex,
        new Ingredient(name, amount)
      );
      this.editMode = false;
    } else {
      this.shoppingListService.addIngredient(new Ingredient(name, amount));
    }
    this.fG.reset();
  }

  onClear() {
    this.fG.reset();
    this.editMode = false;
  }

  onDelete() {
    this.shoppingListService.removeIngredient(this.editedItemIndex);
    this.editMode = false;
    this.fG.reset();
  }

  ngOnInit(): void {
    this.editSub = this.shoppingListService.starteEditing.subscribe((index) => {
      this.editedItemIndex = index;
      this.editMode = true;
      this.editIngredient = this.shoppingListService.getIngredient(index);
      this.fG.setValue({
        nameInput: this.editIngredient.name,
        amountInput: this.editIngredient.amount,
      });
    });
  }

  constructor(private shoppingListService: ShoppingListService) {}
  ngOnDestroy(): void {
    this.editSub.unsubscribe();
  }
}
