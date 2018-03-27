import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { RecipeSearchPage } from '../pages/recipe-search/recipe-search';
import { RecipeSearchPageModule } from '../pages/recipe-search/recipe-search.module';
import { FindIngredientPage } from '../pages/find-ingredient/find-ingredient';
import { FindIngredientPageModule } from '../pages/find-ingredient/find-ingredient.module';
import { IngredientProvider } from '../providers/ingredient/ingredient';
import { StoreModule, ActionReducerMap } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { IngredientsEffects } from '../store/ingredients/ingredients.effects';
import { AppState } from '../store/app-state';
import { ingredientsReducer } from '../store/ingredients/ingredients.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClientModule } from '@angular/common/http';
import { RecipeProvider } from '../providers/recipe/recipe';
import { RecipeEffects } from '../store/recipes/recipes.effects';
import { recipeReducer } from '../store/recipes/recipes.reducer';
import { RecipeListPage } from '../pages/recipe-list/recipe-list';
import { RecipeListPageModule } from '../pages/recipe-list/recipe-list.module';

export const reducers: ActionReducerMap<AppState> = {
  ingredients: ingredientsReducer,
  recipes: recipeReducer
}

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([
      IngredientsEffects,
      RecipeEffects
    ]),
    StoreDevtoolsModule.instrument({
      name: 'Recipe App',
    }),
    BrowserModule,
    HttpClientModule,
    RecipeSearchPageModule,
    FindIngredientPageModule,
    RecipeListPageModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RecipeSearchPage,
    FindIngredientPage,
    RecipeListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    IngredientProvider,
    RecipeProvider
  ]
})
export class AppModule {}
