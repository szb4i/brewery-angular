import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { ofType } from '@ngrx/effects';
import { ActionsSubject, Store } from '@ngrx/store';
import { map, Observable, startWith, Subscription, take } from 'rxjs';
import { AppState } from '../state/app.state';
import { loadBreweriesSuccess, loadClickedBrevery } from '../state/brewery/brewery.actions';
import { Brewery } from '../state/brewery/brewery.model';
import * as _ from 'lodash';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions!: Observable<Brewery[]>;
  breweries!: Brewery[];

  constructor(
    private actionsSubj: ActionsSubject,
    private store: Store<AppState>,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.actionsSubj
      .pipe(ofType(loadBreweriesSuccess), take(1))
      .subscribe(data => {
        this.breweries = data.breweries;
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value || '')),
        );
    });
  }

  private _filter(value: string | Brewery): Brewery[] {
    const filterValue = _.isString(value) ?  value.toLowerCase() : value.name.toLowerCase();
    return this.breweries.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  public onBrewerySelected(brewery: Brewery): void {
    this.router.navigate(['/brewery', brewery.id]);
    this.store.dispatch(loadClickedBrevery({ id: brewery.id }));
  }

  public getBreweryName(brewery: Brewery): string {
    return brewery.name;
  }
}