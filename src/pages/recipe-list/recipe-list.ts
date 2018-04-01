import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Recipe } from '../../model/Recipe';
import { AppState } from '../../store/app-state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { RecipePage } from '../recipe/recipe';
import { LoadMoreRecipes } from '../../store/recipes/recipes.action';

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
  search_results$: Observable<number>;

  recipes_length: number;
  loading_more_recipes: boolean;

  constructor(private store: Store<AppState>,
              public navCtrl: NavController, 
              public navParams: NavParams) {
    this.setup();
  }

  setup() {
    this.recipes$ = this.store.select(state => state.recipes.recipes);
    this.recipes$.subscribe(
      recipes => {
        this.recipes_length = recipes.length;
      }
    )
    this.isLoading$ = this.store.select(state => state.recipes.isLoading);
    this.search_results$ = this.store.select(state => state.recipes.search_results);
  }

  navigateRecipe(recipe: Recipe) {
    this.navCtrl.push(RecipePage, {uri: recipe.uri})
  }

  loadMoreRecipes() {
    this.store.dispatch(new LoadMoreRecipes(this.recipes_length));
  }


  ionViewDidLoad() {}

}
