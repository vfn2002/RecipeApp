import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { secrets } from '../../secrets/secrets';
import 'rxjs/add/operator/map';
import { AppState } from '../../store/app-state';
import { Store } from '@ngrx/store';
import { SetSearchResults } from '../../store/recipes/recipes.action';

/*
  Generated class for the RecipeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RecipeProvider {

  recipe_database_api = 'https://api.edamam.com/search';
  recipe_database_api_key_handle = '&app_key=' + secrets.recipe_search.api_key;
  recipe_database_application_id_handle = '&app_id=' + secrets.recipe_search.application_id;

  lastSearchQueryUrl = '';

  constructor(public http: HttpClient, private store: Store<AppState>) {
  }

  searchRecipes(search_term: string) {

    const url: string = 
    this.recipe_database_api
    + '?q=' + search_term
    + this.recipe_database_application_id_handle
    + this.recipe_database_api_key_handle;

    this.lastSearchQueryUrl = url;

    return this.http.get<any>(url).map(
      (res: any) => {this.store.dispatch(new SetSearchResults(res.count));
                     return res.hits.map(hit => hit = hit.recipe)},
      err => {console.log(err)}
    );
  }

  loadMoreRecipes(from: number) {
    return this.http.get<any>(
      this.lastSearchQueryUrl + '&from=' + from + '&to=' + (from+20)
    ).map(
      (res: any) => {return res.hits.map(hit => hit = hit.recipe)},
      err => {console.log(err)}
    );
  }

}
