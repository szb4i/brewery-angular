import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BreweryListComponent } from './brewery-list/brewery-list.component';
import { BreweryDetailComponent } from './brewery-detail/brewery-detail.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects'
import { breweryReducer } from './state/brewery/brewery.reducer';
import { BreweryEffects } from './state/brewery/brewery.effects';
import { HttpClientModule } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { HeaderComponent } from './header/header.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from "@angular/material/input"


@NgModule({
  declarations: [
    AppComponent,
    BreweryListComponent,
    BreweryDetailComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({ breweries: breweryReducer }, {}),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    EffectsModule.forRoot([ BreweryEffects ]),
    BrowserAnimationsModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
