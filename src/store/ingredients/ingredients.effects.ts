import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { tap, map, exhaustMap, catchError, switchMap, withLatestFrom, exhaust } from 'rxjs/operators';
import { IngredientsActionTypes, SearchIngredient, SearchIngredientSuccess, SearchIngredientFailure } from './ingredients.action';
import { IngredientProvider } from '../../providers/ingredient/ingredient';
import { Ingredient } from '../../model/Ingredient';

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
    private actions$: Actions,
    private ingredientsProvider: IngredientProvider
  ) {}
}