import { IngredientsState } from "./ingredients/ingredients.reducer";
import { RecipeState } from "./recipes/recipes.reducer";

export interface AppState {
  ingredients: IngredientsState,
  recipes: RecipeState
}