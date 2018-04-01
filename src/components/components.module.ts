import { NgModule } from '@angular/core';
import { IngredientsListComponent } from './ingredients-list/ingredients-list';
import { IonicModule } from 'ionic-angular';
import { RecipeItemComponent } from './recipe-item/recipe-item';
import { DifficultyPipe } from '../pipes/difficulty.pipe';
@NgModule({
	declarations: [IngredientsListComponent,
	RecipeItemComponent,
	DifficultyPipe],
	imports: [IonicModule.forRoot(IngredientsListComponent)],
	exports: [IngredientsListComponent,
    RecipeItemComponent]
})
export class ComponentsModule {}
