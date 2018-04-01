import { Pipe, PipeTransform } from '@angular/core';
import { Ingredient } from '../model/Ingredient';

@Pipe({name: 'difficulty'})
export class DifficultyPipe implements PipeTransform {
  transform(ingredients: Ingredient[]): string {
    if(ingredients.length >= 20) return 'hard';
    if(ingredients.length >= 10) return 'medium';
    return 'easy';
  }
}