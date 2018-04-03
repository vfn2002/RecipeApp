import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { tap, map, exhaustMap, catchError, switchMap, withLatestFrom, exhaust } from 'rxjs/operators';
import { IngredientsActionTypes, SearchIngredient, SearchIngredientSuccess, SearchIngredientFailure, AddIngredientsToShoppingList, ClearShoppingList, AddIngredientsToFridge, RemoveIngredientFromFridge } from './ingredients.action';
import { IngredientProvider } from '../../providers/ingredient/ingredient';
import { Ingredient } from '../../model/Ingredient';
import { Storage } from '@ionic/storage';
import { AppState } from '../app-state';
import { Store } from '@ngrx/store';
import { ToastController } from 'ionic-angular';

@Injectable()
export class IngredientsEffects {


  @Effect()
  searchIngredient$ = this.actions$.pipe(
    ofType(IngredientsActionTypes.SEARCH_INGREDIENT),
    map((action: SearchIngredient) => action.payload),
    exhaustMap((searchTerm: string) => 
      this.ingredientsProvider
        .searchIngredients(searchTerm)
        .pipe(
          map((ingredients: Ingredient[]) => new SearchIngredientSuccess(ingredients)),
          catchError(error => of(new SearchIngredientFailure()))
        )
    )
  );


  @Effect({dispatch: false})
  addIngredientsToShoppingList$ = this.actions$.pipe(
    ofType(IngredientsActionTypes.ADD_INGREDIENTS_TO_SHOPPING_LIST),
    map((action: AddIngredientsToShoppingList) => {
      this.store.select(state => state.ingredients.shoppingList)
        .subscribe(
          (ingredients: Ingredient[]) => 
            this.storage.set('shopping_list', {ingredients: [...ingredients]})
        )
    })
  );

  @Effect({dispatch: false})
  addIngredientsToFridge$ = this.actions$.pipe(
    ofType(IngredientsActionTypes.ADD_INGREDIENTS_TO_FRIDGE),
    map((action: AddIngredientsToFridge) => {
      this.store.select(state => state.ingredients.fridge)
        .subscribe(
          (ingredients: Ingredient[]) => 
            this.storage.set('fridge', {ingredients: [...ingredients]})
        )
    })
  );

  @Effect({dispatch: false})
  clearShoppingList$ = this.actions$.pipe(
    ofType(IngredientsActionTypes.CLEAR_SHOPPING_LIST),
    map((action: ClearShoppingList) => {
      this.storage.remove('shopping_list');
      this.toast.create({
        duration: 2000,
        message: 'Cleared shopping list.',
        position: 'top'
      }).present();
    })
  );

  @Effect({dispatch: false})
  removeIngredientFromFridge$ = this.actions$.pipe(
    ofType(IngredientsActionTypes.REMOVE_INGREDIENT_FROM_FRIDGE),
    map((action: RemoveIngredientFromFridge) => {
      this.storage.get('fridge').then((fridge: any) => {
        this.storage.set('fridge', {ingredients: fridge.ingredients.filter(ingredient => ingredient.food.label !== action.payload.food.label)})
      });
    })
  );

  @Effect({dispatch: false})
  removeItemFromShoppingList$ = this.actions$.pipe(
    ofType(IngredientsActionTypes.REMOVE_INGREDIENT_FROM_FRIDGE),
    map((action: RemoveIngredientFromFridge) => {
      this.storage.get('shopping_list').then((shopping_list: any) => {
        this.storage.set('shopping_list', {ingredients: shopping_list.ingredients.filter(ingredient => ingredient.food.label !== action.payload.food.label)})
      });
    })
  );



  // @Effect()
  // addIngredient$ = this.actions$.pipe(
  //   ofType(IngredientsActionTypes.ADD_INGREDIENT),
  //   // map((action: ContinueSesssion) => action.payload),
  //   exhaustMap((auth: any) => 
  //     this.authService
  //       .validateHeaders(this.authService.getLocalStorageAuthHeaders())
  //       .pipe(
  //         map(res => new ContinueSessionSuccess(res.body.data)),
  //         catchError(error => of(new ContinueSessionFailure({error: error})))
  //       )
  //   )
  // )


 
  // @Effect({dispatch: false})
  // logout$ = this.actions$.pipe(
  //   ofType(AuthActionTypes.LOGOUT),
  //   map((action: Logout) => {
  //     this.authService.logout();
  //     this.store$.dispatch(new SetUser(null));
  //   })
  // );

  constructor(
    private store: Store<AppState>,
    private toast: ToastController,
    private storage: Storage,
    private actions$: Actions,
    private ingredientsProvider: IngredientProvider
  ) {}
}