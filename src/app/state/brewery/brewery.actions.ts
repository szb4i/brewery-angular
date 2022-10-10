import { createAction, props } from '@ngrx/store';
import { Brewery } from './brewery.model';
 
export const loadBreweries = createAction(
  '[Brewery List] load breweries'
)

export const loadBreweriesSuccess = createAction(
  '[Brewery API] load breweries success',
  props<{ breweries: Brewery[] }>()
)

export const loadBreweriesFailure = createAction(
  '[Brewery API] load breweries failure',
  props<{ error: string }>()
)

export const loadClickedBrevery = createAction(
  '[Brewery List] load clicked brewery',
  props<{ id: string }>()
)

