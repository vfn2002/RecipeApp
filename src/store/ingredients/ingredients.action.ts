import {Action} from '@ngrx/store'; 
import { Ingredient } from '../../model/Ingredient';

export enum IngredientsActionTypes {
  ADD_INGREDIENT = '[Ingredients] ADD_INGREDIENT',
  DELETE_INGREDIENT = '[Ingredients] DELETE_INGREDIENT',
  SEARCH_INGREDIENT = '[Ingredients] SEARCH_INGREDIENT',
  SEARCH_INGREDIENT_SUCCESS = '[Ingredients] SEARCH_INGREDIENT_SUCCESS',
  SEARCH_INGREDIENT_FAILURE = '[Ingredients] SEARCH_INGREDIENT_FAILURE',
  ADD_INGREDIENTS_TO_SHOPPING_LIST = '[Ingredients] ADD_INGREDIENTS_TO_SHOPPING_LIST',
  REMOVE_INGREDIENT_FROM_SHOPPING_LIST = '[Ingredients] REMOVE_INGREDIENT_FROM_SHOPPING_LIST',
  CLEAR_SHOPPING_LIST = '[Ingredients] CLEAR_SHOPPING_LIST',
  ADD_INGREDIENTS_TO_FRIDGE = '[Ingredients] ADD_INGREDIENTS_TO_FRIDGE',
  REMOVE_INGREDIENT_FROM_FRIDGE = '[Ingredients] REMOVE_INGREDIENT_FROM_FRIDGE',
  CLEAR_FRIDGE = '[Ingredients] CLEAR_FRIDGE'
}

export class AddIngredient implements Action {
  readonly type = IngredientsActionTypes.ADD_INGREDIENT;
  constructor(public payload: Ingredient){
    console.log('AddIngredient payload =>', payload);
  }
}
export class AddIngredientsToShoppingList implements Action {
  readonly type = IngredientsActionTypes.ADD_INGREDIENTS_TO_SHOPPING_LIST;
  constructor(public payload: Ingredient[]) {}
}
export class RemoveIngredientFromShoppingList implements Action {
  readonly type = IngredientsActionTypes.REMOVE_INGREDIENT_FROM_SHOPPING_LIST;
  constructor(public payload: Ingredient) {}
}

export class ClearShoppingList implements Action {
  readonly type = IngredientsActionTypes.CLEAR_SHOPPING_LIST;
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
export class AddIngredientsToFridge implements Action {
  readonly type = IngredientsActionTypes.ADD_INGREDIENTS_TO_FRIDGE;
  constructor(public payload: Ingredient[]){}
}

export class RemoveIngredientFromFridge implements Action {
  readonly type = IngredientsActionTypes.REMOVE_INGREDIENT_FROM_FRIDGE;
  constructor(public payload: Ingredient){}
}
export class ClearFridge implements Action {
  readonly type = IngredientsActionTypes.CLEAR_FRIDGE;
}

export class SearchIngredientFailure implements Action {
  readonly type = IngredientsActionTypes.SEARCH_INGREDIENT_FAILURE;
}

export type IngredientsActions = 
 | AddIngredient
 | DeleteIngredient
 | SearchIngredient
 | SearchIngredientSuccess
 | SearchIngredientFailure
 | AddIngredientsToShoppingList
 | RemoveIngredientFromShoppingList
 | RemoveIngredientFromFridge
 | ClearShoppingList
 | AddIngredientsToFridge
 | ClearFridge;