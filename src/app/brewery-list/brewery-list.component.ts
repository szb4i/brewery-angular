import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { AppState } from '../state/app.state';
import { loadBreweries, loadBreweriesSuccess, loadClickedBrevery } from '../state/brewery/brewery.actions';
import { Brewery } from '../state/brewery/brewery.model';
import { selectBreweries } from '../state/brewery/brewery.selector';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { ActionsSubject } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { BreweryState } from '../state/brewery/brewery.reducer';

@Component({
  selector: 'app-brewery-list',
  templateUrl: './brewery-list.component.html',
  styleUrls: ['./brewery-list.component.scss']
})
export class BreweryListComponent implements OnInit {
  public displayedColumns: string[] = ['name', 'brewery_type', 'country', 'website_url']
  public dataSource = new MatTableDataSource<Brewery>()
  @ViewChild(MatPaginator) paginator!: MatPaginator

  constructor(
    private store: Store<AppState>,
    private actionsSubj: ActionsSubject,
    private router: Router
  ) {}

  ngOnInit(): void {
    let breweryState!: BreweryState;
    this.store.select(selectBreweries)
      .pipe(take(1))
      .subscribe(x => breweryState = x);
    if ('pending' == breweryState.status) {
      this.actionsSubj
        .pipe(ofType(loadBreweriesSuccess), take(1))
        .subscribe(data => this.dataSource.data = data.breweries);
      this.store.dispatch(loadBreweries());
    } else {
      this.dataSource.data = breweryState.breweries;
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  onRowClicked(row: Brewery): void {
    this.router.navigate(['/brewery', row.id]);
    this.store.dispatch(loadClickedBrevery({ id: row.id }));
  }
}
