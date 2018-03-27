export interface Recipe {
  id?: number,
  name?: string
  calories?: number,
  cautions?: any[],
  dietLabels?: any[],
  digest?: any[],
  healthLabels?: any[],
  image?: string,
  ingredientLines: any[],
  ingredients: any[],
  label?: string,
  shareAs?: string,
  source: string,
  totalDaily: any,
  totalNutrients: any,
  totalTime: number,
  totalWeight: number,
  uri: string,
  url: string,
  yield: number
}