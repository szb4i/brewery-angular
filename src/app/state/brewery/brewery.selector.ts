import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { BreweryState } from "./brewery.reducer";

export const selectBreweries = (state: AppState) => state.breweries;
export const selectAllBreweries = createSelector(
    selectBreweries,
    (state: BreweryState) => state.breweries
);
export const selectClickedBrewery = createSelector(
    selectBreweries,
    (state: BreweryState) => state.clickedBrewery
);