import {Action} from '@ngrx/store'; 
import { Recipe } from '../../model/Recipe';

export enum RecipeActionTypes {
  SEARCH_RECIPE = '[Recipe] SEARCH_RECIPE',
  SEARCH_RECIPE_SUCCESS = '[Recipe] SEARCH_RECIPE_SUCCESS',
  SEARCH_RECIPE_FAILURE = '[Recipe] SEARCH_RECIPE_FAILURE'
}

export class SearchRecipe implements Action {
  readonly type = RecipeActionTypes.SEARCH_RECIPE;
  constructor(public payload: string){
    console.log('Search Recipe payload => ', payload);
  }
}

export class SearchRecipeSuccess implements Action {
  readonly type = RecipeActionTypes.SEARCH_RECIPE_SUCCESS;
  constructor(public payload: Recipe[]){
    console.log('success payload => ', payload);
  }
}

export class SearchRecipeFailure implements Action {
  readonly type = RecipeActionTypes.SEARCH_RECIPE_FAILURE;
}

export type RecipeActions = 
 | SearchRecipe
 | SearchRecipeSuccess
 | SearchRecipeFailure;