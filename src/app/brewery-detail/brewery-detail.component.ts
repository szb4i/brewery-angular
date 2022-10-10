import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Subscription, take } from 'rxjs';
import { AppState } from '../state/app.state';
import { Brewery, BreweryObjectKey } from '../state/brewery/brewery.model';
import { selectClickedBrewery } from '../state/brewery/brewery.selector';
import * as _ from 'lodash';

@Component({
  selector: 'app-brewery-detail',
  templateUrl: './brewery-detail.component.html',
  styleUrls: ['./brewery-detail.component.scss']
})
export class BreweryDetailComponent implements OnInit, OnDestroy {
  public brewery!: Brewery;
  public propertyNames!: BreweryObjectKey[];
  private subscription!: Subscription;

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.subscription = this.store.select(selectClickedBrewery).pipe().subscribe(brewery => {
      if (null == brewery) {
        this.router.navigate(['/breweries'])
      } else {
        this.brewery = brewery;
        this.propertyNames = Object.keys(brewery).filter((x) => !_.isNull(this.brewery[(x as BreweryObjectKey)])) as BreweryObjectKey[];
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
