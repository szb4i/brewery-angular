import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from "@ngrx/store";
import { catchError, from, map, of, switchMap } from "rxjs";
import { AppState } from "../app.state";
import { loadBreweries, loadBreweriesFailure, loadBreweriesSuccess } from "./brewery.actions";
import { BreweryService } from "./brewery.service";

@Injectable()
export class BreweryEffects {
    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private breweryService: BreweryService
    ) {}

    public loadBreweries = createEffect(() => {
        return this.actions$.pipe(
            ofType(loadBreweries),
            switchMap(() => 
                this.breweryService.getBreweries().pipe(
                    map((breweries) => {
                        return loadBreweriesSuccess({ breweries: breweries });
                    }),
                    catchError((error) => of(loadBreweriesFailure({ error })))
                )
            )
        )
    })
}