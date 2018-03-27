import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { secrets } from '../../secrets/secrets';
import 'rxjs/add/operator/map';

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

  constructor(public http: HttpClient) {
  }

  searchRecipes(search_term: string) {
    return this.http.get<any>(
      this.recipe_database_api
      + '?q=' + search_term
      + this.recipe_database_application_id_handle
      + this.recipe_database_api_key_handle
    ).map(
      (res: any) => {return res.hits.map(hit => hit = hit.recipe)},
      err => {console.log(err)}
    );
  }

}
