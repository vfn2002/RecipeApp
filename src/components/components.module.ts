import { NgModule } from '@angular/core';
import { IngredientsListComponent } from './ingredients-list/ingredients-list';
import { IonicModule } from 'ionic-angular';
import { RecipeItemComponent } from './recipe-item/recipe-item';
@NgModule({
	declarations: [IngredientsListComponent,
    RecipeItemComponent],
	imports: [IonicModule.forRoot(IngredientsListComponent)],
	exports: [IngredientsListComponent,
    RecipeItemComponent]
})
export class ComponentsModule {}
