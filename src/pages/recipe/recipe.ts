import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Recipe } from '../../model/Recipe';
import { Observable } from 'rxjs/Observable';
import { AppState } from '../../store/app-state';
import { Store } from '@ngrx/store';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { AddIngredientsToShoppingList } from '../../store/ingredients/ingredients.action';
import { Ingredient } from '../../model/Ingredient';

/**
 * Generated class for the RecipePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})
export class RecipePage {

  recipe$: Observable<Recipe>;

  constructor(private store: Store<AppState>,
              private toastCtrl: ToastController,
              private inAppBrowser: InAppBrowser,
              public navCtrl: NavController, 
              public navParams: NavParams) {
    this.setup(navParams);
  }

  setup(navParams: NavParams) {
    if(navParams.data.uri) {
      this.recipe$ = this.store.select(state => 
        state.recipes.recipes.find(recipe => 
          recipe.uri === navParams.data.uri));
    } else {
      console.warn('Could not find recipe =>', navParams.data);
    }
  }

  navigateBack() {
    this.navCtrl.pop();
  }

  openSourceUrl() {
    const options: InAppBrowserOptions = {
      zoom: 'yes',
      footer: 'yes'
    }
    this.recipe$.subscribe(
      recipe => {
        const browser = this.inAppBrowser.create(recipe.url, '_system', options);
      }
    )
  }

  addIngredientsToShoppingList() {
    this.recipe$.subscribe(
      recipe => {
        this.store.dispatch(new AddIngredientsToShoppingList(this.formatIngredients(recipe.ingredients)))
        const toast = this.toastCtrl.create({
          duration: 1500,
          message: 'Added ' + recipe.ingredients.length + ' ingredients to your shopping list.',
          position: 'top'
        });
        toast.present();
      }
    )
  }

  formatIngredients(ingredients: any[]): Ingredient[] {
    const formatted_ingredients: Ingredient[] = [];
    for (const ingredient of ingredients) {
      formatted_ingredients.push({
        food: {
          label: ingredient.text
        }
      })
    }
    return formatted_ingredients;
  }

  ionViewDidLoad() {}

}
