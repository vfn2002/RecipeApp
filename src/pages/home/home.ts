import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FridgePage } from '../fridge/fridge';
import { RecipeSearchPage } from '../recipe-search/recipe-search';
import { ShoppingListPage } from '../shopping-list/shopping-list';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  fridgePage = FridgePage;
  searchPage = RecipeSearchPage;
  shoppingListPage = ShoppingListPage;

  constructor(public navCtrl: NavController) {

  }

}
