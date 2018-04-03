import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppState } from '../../store/app-state';
import { Store } from '@ngrx/store';
import { SearchIngredient, AddIngredient, AddIngredientsToFridge, AddIngredientsToShoppingList } from '../../store/ingredients/ingredients.action';
import { Ingredient } from '../../model/Ingredient';
import { Observable } from 'rxjs/Observable';
import { RecipeSearchPage } from '../recipe-search/recipe-search';
import { FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime, switchMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { FridgePage } from '../fridge/fridge';
import { ShoppingListPage } from '../shopping-list/shopping-list';

/**
 * Generated class for the FindIngredientPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-find-ingredient',
  templateUrl: 'find-ingredient.html',
})
export class FindIngredientPage {

  ingredients$: Observable<Ingredient[]>;
  isLoading$: Observable<boolean>;
  searchForm: FormGroup;
  searchInput: string;

  constructor(public store: Store<AppState>,
              public formBuilder: FormBuilder,
              public navCtrl: NavController,
              public navParams: NavParams) {
    this.setup();
  }

  setup() {
    this.searchForm = this.formBuilder.group({
      'searchInput': [null]
    })

    // Uncomment this to enable searching for ingredients.
    // this.searchForm.valueChanges
    //   .pipe(
    //     debounceTime(500),
    //     switchMap((form: any) => {
    //       if (form.searchInput) return of(this.store.dispatch(new SearchIngredient(form.searchInput)))
    //     })
    //   )
    //   .subscribe(
    //     res => {console.log(res)},
    //     err => {console.log(err)}
    //   )

    this.searchForm.valueChanges
      .subscribe(
        input => {this.searchInput = input.searchInput}
      );
 
    this.ingredients$ = this.store.select(state => state.ingredients.searchIngredientPayload);
    this.isLoading$ = this.store.select(state => state.ingredients.isLoading);
  }

  ionViewDidLoad() {}

  addIngredient(ingredient: Ingredient) {

    if (this.navParams.data.isAddingToFridge) {
      this.store.dispatch(new AddIngredientsToFridge([ingredient]));
      this.navCtrl.push(FridgePage);
    } else if (this.navParams.data.isAddingToShoppingList) {
      this.store.dispatch(new AddIngredientsToShoppingList([ingredient]));
      this.navCtrl.push(ShoppingListPage);
    } else {
      this.store.dispatch(new AddIngredient(ingredient));
      this.navCtrl.push(RecipeSearchPage);
    }
    
  }

  addIngredientFromLabel(searchInput: string) {
    const ingredient: Ingredient = {
      food: {
        label: searchInput
      },
      measures: {}
    };
    this.addIngredient(ingredient);
  }

  getPageType(): string {
    if (this.navParams.data.isAddingToShoppingList) {
      return 'shopping list';
    } else if (this.navParams.data.isAddingToFridge) {
      return 'fridge';
    } else {
      return 'search';
    }
  }

}
