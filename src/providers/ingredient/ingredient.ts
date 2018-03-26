import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { secrets } from '../../secrets/secrets';
import 'rxjs/add/operator/map';
import { of } from 'rxjs/observable/of';
import { Ingredient } from '../../model/Ingredient';

/*
  Generated class for the IngredientProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class IngredientProvider {


  food_database_api = 'https://api.edamam.com/api/food-database/parser';
  food_database_api_key_handle = '&app_key=' + secrets.food_search.api_key;
  food_database_application_id_handle = '&app_id=' + secrets.food_search.application_id;

  'https://api.edamam.com/api/food-database/parser?ingr=red%20apple&app_id={your app_id}&app_key={your app_key}&page=0'



  constructor(public http: HttpClient) {
  }

  searchIngredients(search_term: string, page: number = 0) {
    return this.http.get<any>(
      this.food_database_api
      + '?ingr=' + search_term
      + this.food_database_api_key_handle
      + this.food_database_application_id_handle
      + '&page=' + page
    ).map(
      (res: any) => {console.log('ingredients response => ', res); return res.hints},
      err => {console.log(err)}
    );
  }

}