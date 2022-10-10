import { state } from "@angular/animations";
import { createReducer, on } from "@ngrx/store";
import { loadBreweries, loadBreweriesFailure, loadBreweriesSuccess, loadClickedBrevery } from "./brewery.actions";
import { Brewery } from "./brewery.model";

export interface BreweryState {
    breweries: Brewery[];
    clickedBrewery: Brewery | null;
    error: string;
    status: 'pending' | 'loading' | 'error' | 'success';
}

export const initialState: BreweryState = {
    breweries: [],
    clickedBrewery: null,
    error: '',
    status: 'pending'
}

export const breweryReducer = createReducer(
    initialState,
    on(loadBreweries, (state) => ({
         ...state, status: 'loading' 
    })),
    on(loadBreweriesSuccess, (state, { breweries }) => ({ 
        ...state, 
        breweries: breweries,
        error: '',
        status: 'success'
    })),
    on(loadBreweriesFailure, (state, { error }) => ({
        ...state,
        error: error,
        status: 'error'
    })),
    on(loadClickedBrevery, (state, { id }) => ({
        ...state,
        clickedBrewery: state.breweries.find(x => x.id == id) || null
    }))
)