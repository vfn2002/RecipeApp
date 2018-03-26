import { IngredientsActions, IngredientsActionTypes } from "./ingredients.action";
import { Ingredient } from "../../model/Ingredient";

export interface IngredientsState {
  searchIngredientPayload: Ingredient[],
  ingredients: Ingredient[],
  isLoading: boolean
}

export const initialState: IngredientsState = {
  searchIngredientPayload: null,
  ingredients: [],
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

    default: {
      return state;
    }
  }
}