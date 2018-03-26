import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecipeSearchPage } from './recipe-search';
import { IngredientsListComponent } from '../../components/ingredients-list/ingredients-list';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    RecipeSearchPage
  ],
  imports: [
    IonicPageModule.forChild(RecipeSearchPage),
    ComponentsModule
  ],
  exports: []
})
export class RecipeSearchPageModule {}
