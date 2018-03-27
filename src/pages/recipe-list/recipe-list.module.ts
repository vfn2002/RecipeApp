import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecipeListPage } from './recipe-list';
import { ComponentsModule } from '../../components/components.module';


@NgModule({
  declarations: [
    RecipeListPage,
  ],
  imports: [
    IonicPageModule.forChild(RecipeListPage),
    ComponentsModule
  ],
})
export class RecipeListPageModule {}
