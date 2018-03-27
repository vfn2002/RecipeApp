import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Recipe } from '../../model/Recipe';
import { AppState } from '../../store/app-state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the RecipeListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recipe-list',
  templateUrl: 'recipe-list.html',
})
export class RecipeListPage {

  recipes$: Observable<Recipe[]>;
  isLoading$: Observable<boolean>;

  constructor(private store: Store<AppState>,
              public navCtrl: NavController, 
              public navParams: NavParams) {
    this.setup();
  }

  setup() {
    this.recipes$ = this.store.select(state => state.recipes.recipes);
    this.isLoading$ = this.store.select(state => state.recipes.isLoading);
  }


  ionViewDidLoad() {}

}
