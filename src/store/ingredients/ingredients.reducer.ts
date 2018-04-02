import { IngredientsActions, IngredientsActionTypes } from "./ingredients.action";
import { Ingredient } from "../../model/Ingredient";

export interface IngredientsState {
  searchIngredientPayload: Ingredient[],
  ingredients: Ingredient[],
  shoppingList: Ingredient[],
  fridge: Ingredient[],
  isLoading: boolean
}

export const initialState: IngredientsState = {
  searchIngredientPayload: null,
  ingredients: [],
  shoppingList: [],
  fridge: [],
  isLoading: false
};

export function ingredientsReducer(state = initialState, action: IngredientsActions): IngredientsState {
  switch (action.type) {

    case IngredientsActionTypes.ADD_INGREDIENT: {
      return {
        ...state,
        ingredients: [action.payload, ...state.ingredients]
      }
    }

    case IngredientsActionTypes.ADD_INGREDIENTS_TO_FRIDGE: {
      return {
        ...state,
        fridge: [...state.fridge, ...action.payload]
      }
    }

    case IngredientsActionTypes.CLEAR_FRIDGE: {
      return {
        ...state,
        fridge: []
      }
    }

    case IngredientsActionTypes.ADD_INGREDIENTS_TO_SHOPPING_LIST: {
      return {
        ...state,
        shoppingList: [...state.shoppingList, ...action.payload]
      }
    }

    case IngredientsActionTypes.CLEAR_SHOPPING_LIST: {
      return {
        ...state,
        shoppingList: []
      }
    }

    case IngredientsActionTypes.DELETE_INGREDIENT: {
      return {
        ...state,
        ingredients: state.ingredients.filter(ingredient => ingredient !== action.payload)
      }
    }

    case IngredientsActionTypes.SEARCH_INGREDIENT: {
      return {
        ...state,
        isLoading: true
      }
    }

    case IngredientsActionTypes.SEARCH_INGREDIENT_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        searchIngredientPayload: action.payload
      }
    }

    case IngredientsActionTypes.SEARCH_INGREDIENT_FAILURE: {
      return {
        ...state,
        isLoading: false
      }
    }

    default: {
      return state;
    }
  }
}