import {RouterModule, Routes} from '@angular/router';
import {SearchResultsListComponent} from './search-results-list/search-results-list.component';
import {NgModule} from '@angular/core';


const searchResultsRoutes: Routes = [
  {path: 'search-results/:searchTerm', component: SearchResultsListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(searchResultsRoutes)],
  exports: [RouterModule]
})

export class SearchResultsRoutingModule {
}
