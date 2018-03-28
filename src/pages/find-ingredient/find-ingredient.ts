import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppState } from '../../store/app-state';
import { Store } from '@ngrx/store';
import { SearchIngredient, AddIngredient } from '../../store/ingredients/ingredients.action';
import { Ingredient } from '../../model/Ingredient';
import { Observable } from 'rxjs/Observable';
import { RecipeSearchPage } from '../recipe-search/recipe-search';
import { FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime, switchMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

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

    this.searchForm.valueChanges
      .pipe(
        debounceTime(500),
        switchMap((form: any) => {
          if (form.searchInput) return of(this.store.dispatch(new SearchIngredient(form.searchInput)))
        })
      )
      .subscribe(
        res => {console.log(res)},
        err => {console.log(err)}
      )

    this.searchForm.valueChanges
      .subscribe(
        input => {this.searchInput = input.searchInput}
      );

    this.ingredients$ = this.store.select(state => state.ingredients.searchIngredientPayload);
    this.isLoading$ = this.store.select(state => state.ingredients.isLoading);
  }

  ionViewDidLoad() {
    
  }

  testApi() {
    this.store.dispatch(new SearchIngredient('apple'));
  }

  addIngredient(ingredient: Ingredient) {
    this.store.dispatch(new AddIngredient(ingredient));
    this.navCtrl.push(RecipeSearchPage);
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

}
