import { Component, Input } from '@angular/core';
import { Ingredient } from '../../model/Ingredient';

/**
 * Generated class for the IngredientsListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'ingredients-list',
  templateUrl: 'ingredients-list.html'
})
export class IngredientsListComponent {

  @Input() ingredients: Ingredient[];

  constructor() {
  }

}
