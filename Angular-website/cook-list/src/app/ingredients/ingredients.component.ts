import { Component } from '@angular/core';
import { Ingredient } from '../igredient';
import { INGREDIENTS } from '../mock-ingredients';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css']
})
export class IngredientsComponent {
   ingredients = INGREDIENTS;
   selectedIngredient ? : Ingredient;
  onSelect(ingredient: Ingredient) : void {
    this.selectedIngredient = ingredient;
  }
}
