export interface Ingredient {
  food?: Food,
  measures?: Measures,
  isSelected?: boolean
}

export interface Food {
  label?: string,
  uri?: string
}

export interface Measures {
  label?: string,
  uri?: string
}