import {NgModule} from '@angular/core';
import {SearchResultsListComponent} from './search-results-list/search-results-list.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {SearchResultsRoutingModule} from './search-results-routing.module';
import {SearchResultsService} from './search-results.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SearchResultsRoutingModule
  ],
  declarations: [
    SearchResultsListComponent
  ],
  providers: [
    SearchResultsService
  ]

})

export class SearchResultsModule {}
