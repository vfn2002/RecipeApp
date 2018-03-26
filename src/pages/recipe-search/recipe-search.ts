import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Ingredient } from '../../model/Ingredient';
import { FindIngredientPage } from '../find-ingredient/find-ingredient';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app-state';

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

  constructor(public store: Store<AppState>,
              public navCtrl: NavController,
              public navParams: NavParams) {
  }

  ingredients: Ingredient[] = [
    // { name: 'Egg' },
    // { name: 'Milk' },
    // { name: 'Milk' },
    // { name: 'Milk' },
    // { name: 'Milk' },
    // { name: 'Milk' },
    // { name: 'Milk' },
    // { name: 'Milk' },
    // { name: 'Milk' },
    // { name: 'Milk' },
    // { name: 'Milk' },
    // { name: 'Milk' },
    // { name: 'Milk' },
  ]

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecipeSearchPage');
  }

  addIngredient() {
    this.navCtrl.push(FindIngredientPage);
  }

}
