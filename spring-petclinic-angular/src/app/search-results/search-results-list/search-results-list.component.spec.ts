import { ComponentFixture, TestBed } from '@angular/core/testing';

import {SearchResultsListComponent} from './search-results-list.component';
import {SearchResultsService} from '../search-results.service';
import {ActivatedRoute, Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {ActivatedRouteStub, RouterStub} from 'app/testing/router-stubs';
import { HttpClientModule } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Owner} from '../../owners/owner';
import {PetAndOwner, VisitPetOwnerVets} from '../search-results';
import {Vet} from '../../vets/vet';

class SearchResultsServiceStub {
  getOwnerSearch(): Observable<Owner[]> {
      return of();
    }

    getPetSearch(): Observable<PetAndOwner[]> {
      return of();
    }

    getVetSearch(): Observable<Vet[]> {
      return of();
    }

    getVisitSearch(): Observable<VisitPetOwnerVets[]> {
      return of();
    }
}
class HttpClientModuleStub{
}

describe('SearchResultsListComponent', () => {
  let component: SearchResultsListComponent;
  let fixture: ComponentFixture<SearchResultsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchResultsListComponent ],
      providers: [
        {provide: SearchResultsService, useClass: SearchResultsServiceStub},
        {provide: Router, useClass: RouterStub},
        {provide: ActivatedRoute, useClass: ActivatedRouteStub},
        {provide: HttpClientModule, useClass: HttpClientModuleStub}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
