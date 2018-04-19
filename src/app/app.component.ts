import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { RecipeSearchPage } from '../pages/recipe-search/recipe-search';
import { Storage } from '@ionic/storage';
import { AppState } from '../store/app-state';
import { Store } from '@ngrx/store';
import { AddIngredientsToShoppingList, AddIngredientsToFridge } from '../store/ingredients/ingredients.action';
import { Ingredient } from '../model/Ingredient';
import { IntroPage } from '../pages/intro/intro';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(storage: Storage, store: Store<AppState>, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {

      /**
       * Setup all localstorage with Redux.
       */
      storage.get('shopping_list').then((shopping_list: any) => {
          if (shopping_list && shopping_list.ingredients) store.dispatch(new AddIngredientsToShoppingList(shopping_list.ingredients))
        }
      )
      storage.get('fridge').then((fridge: any) => {
        if (fridge && fridge.ingredients) store.dispatch(new AddIngredientsToFridge(fridge.ingredients));
      });

      /**
       * Present intro if not completed.
       */
      storage.get('intro_completed').then(completed => { 
        if(completed){
          this.rootPage = HomePage;
        } else {
          this.rootPage = IntroPage;
          storage.set('intro_completed', true);
        }
      });
 
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

