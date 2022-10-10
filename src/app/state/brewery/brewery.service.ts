import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { map, Observable } from "rxjs";
import { Brewery } from "./brewery.model";


@Injectable({ providedIn: 'root' })
export class BreweryService {
    constructor(
        private http: HttpClient
    ) {}

    getBreweries(): Observable<Array<Brewery>> {
        return this.http
            .get<Brewery[]>(
            'https://api.openbrewerydb.org/breweries'
            )
            .pipe(map((res) => res || []));
    }
}