import { Injectable } from '@angular/core';
import { Ingredient } from './igredient';
import { INGREDIENTS } from './mock-ingredients';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  getIngredients(): Ingredient[] {
    return INGREDIENTS;
  }
}
