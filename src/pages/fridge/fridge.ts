import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { AppState } from '../../store/app-state';
import { Store } from '@ngrx/store';
import { Ingredient } from '../../model/Ingredient';
import { Observable } from 'rxjs/Observable';
import { FindIngredientPage } from '../find-ingredient/find-ingredient';
import { ClearFridge, AddIngredient, DeleteIngredient, RemoveIngredientFromFridge } from '../../store/ingredients/ingredients.action';

/**
 * Generated class for the FridgePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-fridge',
  templateUrl: 'fridge.html',
})
export class FridgePage {

  ingredients$: Observable<Ingredient[]>;

  constructor(private store: Store<AppState>,
              private toastCtrl: ToastController,
              public navCtrl: NavController,
              private alert: AlertController,
              public navParams: NavParams) {
    this.setup();
  }

  setup() {
    this.ingredients$ = this.store.select(state => state.ingredients.fridge);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FridgePage');
  }

  addItemToFridge() {
    this.navCtrl.push(FindIngredientPage, {isAddingToFridge: true});
  }

  toggleItemToSearch(ingredient: Ingredient) {
    if (ingredient.isSelected) {
      ingredient.isSelected = false;
      this.store.dispatch(new DeleteIngredient(ingredient));
      this.toastCtrl.create({
        duration: 1500,
        message: 'Removed ' + ingredient.food.label + ' from your search.',
        position: 'top'
      }).present();
    } else {
      ingredient.isSelected = true;
      this.store.dispatch(new AddIngredient(ingredient));
      this.toastCtrl.create({
        duration: 1500,
        message: 'Added ' + ingredient.food.label + ' to your search.',
        position: 'top'
      }).present();
    }
  }

  removeFromFridge(ingredient: Ingredient) {
    this.store.dispatch(new RemoveIngredientFromFridge(ingredient));
  }

  clearFridge() {
    const confirm_clear = this.alert.create({
      title: 'Clear fridge',
      message: 'Are you sure you want to clear out your fridge?',
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
            this.store.dispatch(new ClearFridge());
          }
        }
      ]
    })
    confirm_clear.present();
  }

}
