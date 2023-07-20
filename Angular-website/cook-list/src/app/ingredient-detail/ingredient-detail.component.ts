import { Component, Input } from '@angular/core';
import { Ingredient } from '../igredient';


@Component({
  selector: 'app-ingredient-detail',
  templateUrl: './ingredient-detail.component.html',
  styleUrls: ['./ingredient-detail.component.css']
})
export class IngredientDetailComponent {
  @Input() ingredient?: Ingredient;
}
