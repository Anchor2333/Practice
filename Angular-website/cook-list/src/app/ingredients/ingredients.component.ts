import { Component } from '@angular/core';
import { INGREDIENTS } from '../mock-ingredients';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css']
})
export class IngredientsComponent {
  selectedIngredients? : IngredientsComponent;
  onSelect(ingredients : IngredientsComponent) : void {
    this.selectedIngredients = ingredients;
  }
  ingredients = INGREDIENTS;
}
