import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FindIngredientPage } from './find-ingredient';

@NgModule({
  declarations: [
    FindIngredientPage,
  ],
  imports: [
    IonicPageModule.forChild(FindIngredientPage),
  ],
})
export class FindIngredientPageModule {}
