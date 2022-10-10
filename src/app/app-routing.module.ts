import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BreweryDetailComponent } from './brewery-detail/brewery-detail.component';
import { BreweryListComponent } from './brewery-list/brewery-list.component';

const routes: Routes = [
  {path: 'breweries', component: BreweryListComponent},
  {path: '', redirectTo: '/breweries', pathMatch: 'full'},
  {path: 'brewery/:id', component: BreweryDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
