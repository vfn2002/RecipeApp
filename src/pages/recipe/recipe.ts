import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Recipe } from '../../model/Recipe';
import { Observable } from 'rxjs/Observable';
import { AppState } from '../../store/app-state';
import { Store } from '@ngrx/store';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';

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
      zoom: 'no',
      hardwareback: 'no',
      footer: 'yes'
    }
    this.recipe$.subscribe(
      recipe => {
        const browser = this.inAppBrowser.create(recipe.url, '_self', options);
      }
    )
  }


  ionViewDidLoad() {}

}
