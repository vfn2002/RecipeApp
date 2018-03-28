import {Action} from '@ngrx/store'; 
import { Ingredient } from '../../model/Ingredient';

export enum IngredientsActionTypes {
  ADD_INGREDIENT = '[Ingredients] ADD_INGREDIENT',
  DELETE_INGREDIENT = '[Ingredients] DELETE_INGREDIENT',
  SEARCH_INGREDIENT = '[Ingredients] SEARCH_INGREDIENT',
  SEARCH_INGREDIENT_SUCCESS = '[Ingredients] SEARCH_INGREDIENT_SUCCESS',
  SEARCH_INGREDIENT_FAILURE = '[Ingredients] SEARCH_INGREDIENT_FAILURE'
}

export class AddIngredient implements Action {
  readonly type = IngredientsActionTypes.ADD_INGREDIENT;
  constructor(public payload: Ingredient){
    console.log('AddIngredient payload =>', payload);
  }
}

export class DeleteIngredient implements Action {
  readonly type = IngredientsActionTypes.DELETE_INGREDIENT;
  constructor(public payload: Ingredient){}
}

export class SearchIngredient implements Action {
  readonly type = IngredientsActionTypes.SEARCH_INGREDIENT;
  constructor(public payload: string){
    console.log('Search Ingredient payload => ', payload);
  }
}

export class SearchIngredientSuccess implements Action {
  readonly type = IngredientsActionTypes.SEARCH_INGREDIENT_SUCCESS;
  constructor(public payload: Ingredient[]){
    console.log('success payload => ', payload);
  }
}

export class SearchIngredientFailure implements Action {
  readonly type = IngredientsActionTypes.SEARCH_INGREDIENT_FAILURE;
}

export type IngredientsActions = 
 | AddIngredient
 | DeleteIngredient
 | SearchIngredient
 | SearchIngredientSuccess
 | SearchIngredientFailure;