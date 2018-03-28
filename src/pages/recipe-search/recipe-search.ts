import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Ingredient} from '../../model/Ingredient';
import { FindIngredientPage } from '../find-ingredient/find-ingredient';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app-state';
import { Observable } from 'rxjs/Observable';
import { SearchRecipe } from '../../store/recipes/recipes.action';
import { RecipeListPage } from '../recipe-list/recipe-list';
import { DeleteIngredient } from '../../store/ingredients/ingredients.action';

/**
 * Generated class for the RecipeSearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recipe-search',
  templateUrl: 'recipe-search.html',
})
export class RecipeSearchPage {

  ingredients$: Observable<Ingredient[]>;

  ingredients_query: string;


  constructor(public store: Store<AppState>,
              public navCtrl: NavController,
              public navParams: NavParams) {
    this.setup();
  }

  setup() {
    this.ingredients$ = this.store.select(state => state.ingredients.ingredients);
    this.ingredients$.subscribe(
      ingredients => this.formatIngredients(ingredients)
    );
  }

  formatIngredients(ingredients: Ingredient[]) {
    let ingredientsString: string = '';
    for (const ingredient of ingredients) {
      ingredientsString += ' ' + ingredient.food.label;
    }
    this.ingredients_query = ingredientsString.replace(',', '');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecipeSearchPage');
  }

  searchRecipe() {
    this.store.dispatch(new SearchRecipe(this.ingredients_query));
    this.navCtrl.push(RecipeListPage);
  }

  addIngredient() {
    this.navCtrl.push(FindIngredientPage);
  }

  deleteIngredient(ingredient: Ingredient) {
    this.store.dispatch(new DeleteIngredient(ingredient));
  }

}
