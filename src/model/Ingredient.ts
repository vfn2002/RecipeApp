export interface Ingredient {
  food?: Food,
  measures?: Measures
}

export interface Food {
  label?: string,
  uri?: string
}

export interface Measures {
  label?: string,
  uri?: string
}