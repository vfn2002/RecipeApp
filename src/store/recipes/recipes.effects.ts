import { RecipeActionTypes, SearchRecipeSuccess, SearchRecipeFailure } from "./recipes.action";
import { Recipe } from "../../model/Recipe";
import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { tap, map, exhaustMap, catchError, switchMap, withLatestFrom, exhaust } from 'rxjs/operators';
import { RecipeProvider } from "../../providers/recipe/recipe";

@Injectable()
export class RecipeEffects {

  @Effect()
  searchRecipe$ = this.actions$.pipe(
    ofType(RecipeActionTypes.SEARCH_RECIPE),
    map((action: any) => action.payload),
    exhaustMap((searchTerm: string) => 
      this.recipeProvider
        .searchRecipes(searchTerm)
        .pipe(
          map((recipes: Recipe[]) => new SearchRecipeSuccess(recipes)),
          catchError(error => of(new SearchRecipeFailure()))
        )
    )
  );

  @Effect()
  loadMoreRecipes$ = this.actions$.pipe(
    ofType(RecipeActionTypes.LOAD_MORE_RECIPES),
    map((action: any) => action.payload),
    exhaustMap((from: number) => 
      this.recipeProvider
        .loadMoreRecipes(from)
        .pipe(
          map((recipes: Recipe[]) => new SearchRecipeSuccess(recipes)),
          catchError(error => of(new SearchRecipeFailure()))
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
    private recipeProvider: RecipeProvider
  ) {}
}