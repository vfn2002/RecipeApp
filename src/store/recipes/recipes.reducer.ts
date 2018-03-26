import { Recipe } from "../../model/Recipe";
import { RecipeActionTypes, RecipeActions } from "./recipes.action";

export interface RecipeState {
  recipes: Recipe[],
  isLoading: boolean
}

export const initialState: RecipeState = {
  recipes: [],
  isLoading: false
};

export function recipeReducer(state = initialState, action: RecipeActions): RecipeState {
  switch (action.type) {


    case RecipeActionTypes.SEARCH_RECIPE: {
      return {
        ...state,
        isLoading: true
      }
    }

    case RecipeActionTypes.SEARCH_RECIPE_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        recipes: action.payload
      }
    }

    default: {
      return state;
    }
  }
}