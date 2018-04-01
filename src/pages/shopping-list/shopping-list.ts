import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AppState } from '../../store/app-state';
import { Store } from '@ngrx/store';
import { Ingredient } from '../../model/Ingredient';
import { Observable } from 'rxjs/Observable';
import { ClearShoppingList } from '../../store/ingredients/ingredients.action';

/**
 * Generated class for the ShoppingListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

  shopping_list$: Observable<Ingredient[]>;

  constructor(public store: Store<AppState>,
              public navCtrl: NavController,
              private alert: AlertController,
              public navParams: NavParams) {
    this.setup();
  }

  setup() {
    this.shopping_list$ = this.store.select(state => state.ingredients.shoppingList);
  }

  ionViewDidLoad() {}

  deleteIngredient(ingredient: Ingredient) {

  }

  clearList() {
    const confirm_clear = this.alert.create({
      title: 'Clear shopping list',
      message: 'Are you sure you want to clear your shopping list?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            
          }
        },
        {
          text: 'Clear',
          handler: () => {
            this.store.dispatch(new ClearShoppingList());
          }
        }
      ]
    })
    confirm_clear.present();
  }

}
