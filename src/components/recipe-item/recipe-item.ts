import { Component, Input } from '@angular/core';
import { Recipe } from '../../model/Recipe';

/**
 * Generated class for the RecipeItemComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'recipe-item',
  templateUrl: 'recipe-item.html'
})
export class RecipeItemComponent {

  @Input() recipe: Recipe;

  constructor() {}

}
