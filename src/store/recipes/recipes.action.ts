import {Action} from '@ngrx/store'; 
import { Recipe } from '../../model/Recipe';

export enum RecipeActionTypes {
  SEARCH_RECIPE = '[Recipe] SEARCH_RECIPE',
  SEARCH_RECIPE_SUCCESS = '[Recipe] SEARCH_RECIPE_SUCCESS',
  SEARCH_RECIPE_FAILURE = '[Recipe] SEARCH_RECIPE_FAILURE',
  SET_SEARCH_RESULTS = '[Recipe] SET_SEARCH_RESULTS',
  LOAD_MORE_RECIPES = '[Recipe] LOAD_MORE_RECIPES'
}

export class SearchRecipe implements Action {
  readonly type = RecipeActionTypes.SEARCH_RECIPE;
  constructor(public payload: string){
    console.log('Search Recipe payload => ', payload);
  }
}

export class LoadMoreRecipes implements Action {
  readonly type = RecipeActionTypes.LOAD_MORE_RECIPES;
  constructor(public payload: any){}
}

export class SearchRecipeSuccess implements Action {
  readonly type = RecipeActionTypes.SEARCH_RECIPE_SUCCESS;
  constructor(public payload: Recipe[]){
    console.log('success payload => ', payload);
  }
}

export class SetSearchResults implements Action {
  readonly type = RecipeActionTypes.SET_SEARCH_RESULTS;
  constructor(public payload: number){}
}



export class SearchRecipeFailure implements Action {
  readonly type = RecipeActionTypes.SEARCH_RECIPE_FAILURE;
}

export type RecipeActions = 
 | SearchRecipe
 | SearchRecipeSuccess
 | SearchRecipeFailure
 | SetSearchResults
 | LoadMoreRecipes;