import { NgModule } from '@angular/core';
import { IngredientsListComponent } from './ingredients-list/ingredients-list';
import { IonicModule } from 'ionic-angular';
@NgModule({
	declarations: [IngredientsListComponent],
	imports: [IonicModule.forRoot(IngredientsListComponent)],
	exports: [IngredientsListComponent]
})
export class ComponentsModule {}
