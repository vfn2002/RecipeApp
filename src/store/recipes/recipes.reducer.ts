import { Recipe } from "../../model/Recipe";
import { RecipeActionTypes, RecipeActions } from "./recipes.action";

export interface RecipeState {
  recipes: Recipe[],
  search_results: number,

  isLoading: boolean
}

export const initialState: RecipeState = {
  recipes: [],
  search_results: 0,
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

    case RecipeActionTypes.LOAD_MORE_RECIPES: {
      return {
        ...state,
        isLoading: true
      }
    }

    case RecipeActionTypes.SET_SEARCH_RESULTS: {
      return {
        ...state,
        search_results: action.payload
      }
    }

    case RecipeActionTypes.SEARCH_RECIPE_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        recipes: [...state.recipes, ...action.payload]
      }
    }

    default: {
      return state;
    }
  }
}