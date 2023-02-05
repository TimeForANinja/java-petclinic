/*
 *
 *  * Copyright 2016-2017 the original author or authors.
 *  *
 *  * Licensed under the Apache License, Version 2.0 (the "License");
 *  * you may not use this file except in compliance with the License.
 *  * You may obtain a copy of the License at
 *  *
 *  *      http://www.apache.org/licenses/LICENSE-2.0
 *  *
 *  * Unless required by applicable law or agreed to in writing, software
 *  * distributed under the License is distributed on an "AS IS" BASIS,
 *  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  * See the License for the specific language governing permissions and
 *  * limitations under the License.
 *
 */

/* tslint:disable:no-unused-variable */

/**
 * @author Vitaliy Fedoriv
 */

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

import {VisitListComponent} from './visit-list.component';
import {FormsModule} from '@angular/forms';
import {VisitService} from '../visit.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ActivatedRouteStub, RouterStub} from '../../testing/router-stubs';
import {Visit,VisitAndPet, VisitPetAndOwner} from '../visit';
import {Pet} from '../../pets/pet';
import {Vet} from '../../vets/vet';
import {Owner} from '../../owners/owner';
import {Observable, of} from 'rxjs';
import Spy = jasmine.Spy;
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

class VisitServiceStub {
  deleteVisit(visitId: string): Observable<number> {
    return of();
  }
  getVisitsAndExpand(): Observable<Visit[]> {
    return of();
  }
}

describe('VisitListComponent', () => {
  let component: VisitListComponent;
  let fixture: ComponentFixture<VisitListComponent>;
  let visitService: VisitService;
  let testVisits: VisitPetAndOwner[];
  let testOwner: Owner;
  let testPet: Pet;
  let testVet: Vet;
  let spy: Spy;
  let responseStatus: number;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [VisitListComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [FormsModule],
      providers: [
        {provide: VisitService, useClass: VisitServiceStub},
        {provide: Router, useClass: RouterStub},
        {provide: ActivatedRoute, useClass: ActivatedRouteStub}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitListComponent);
    component = fixture.componentInstance;
    testOwner = {
      id: 10,
      firstName: 'James',
      lastName: 'Franklin',
      address: '110 W. Liberty St.',
      city: 'Madison',
      telephone: '6085551023',
      pets: null,
    },
    testPet = {
      id: 1,
      name: 'Leo',
      birthDate: '2010-09-07',
      type: {id: 1, name: 'cat'},
      ownerId: 1,
      owner: testOwner,
      visits: null
    };
    testVet = {
      id: 1,
      firstName: 'James',
      lastName: 'Carter',
      specialties: null,
      visits: null
    };
    testVisits =  [{
      visit: {
        id: 1,
        date: '2016-09-07',
        description: '',
        pet: testPet,
        petId: testPet.id,
        vet: testVet,
        vetId: testVet.id,
      },
      pet: testPet,
      owner: testOwner
    }];

    visitService = fixture.debugElement.injector.get(VisitService);
    responseStatus = 204; // success delete return NO_CONTENT
    component.expandedVisits = testVisits;

    router=TestBed.get(Router);

    spy = spyOn(visitService, 'deleteVisit')
      .and.returnValue(of(responseStatus));

    fixture.detectChanges();
  });

  it('should create VisitListComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should call deleteVisit() method', () => {
    const og_confirm = window.confirm;
    window.confirm = () => true;

    fixture.detectChanges();
    component.deleteVisit(component.expandedVisits[0].visit);
    expect(spy.calls.any()).toBe(true, 'deleteVisit called');

    window.confirm = og_confirm;
  });

  it('should call move5() method', () => {
    let move5Spy = spyOn(component, 'move5').and.returnValues();
    let nextButton = document.getElementById('next5');
    nextButton.click();
    expect(move5Spy.calls.any()).toBe(true, 'move5 called');
  });

  it('should call move5() method', () => {
    let move5Spy = spyOn(component, 'move5').and.returnValues();
    let prevButton = document.getElementById('prev5');
    prevButton.click();
    expect(move5Spy.calls.any()).toBe(true, 'move5 called');
  });

  it('should find a link in the visit-table', function() {
      const table = document.getElementById('visit-list-table') as HTMLTableElement;
      let linkExists = false;

      // Loop through all rows in the table
      for (let i = 0, row; row = table.rows[i]; i++) {
        // Loop through all cells in the row
        for (let j = 0, cell; cell = row.cells[j]; j++) {
          // Check if the cell contains a link
          if (cell.getElementsByTagName('a').length > 0) {
            linkExists = true;
            break;
          }
        }
        if (linkExists) {
          break;
        }
      }

      expect(linkExists).toBeTruthy();
    });

/*
  it("should redirect to the correct page", function(done) {
    // TODO: getAttribute routerLink return null???!
    let links = fixture.debugElement.queryAll(By.css('a'));
    let link = links[0].nativeElement;
    let id = link.getAttribute("id");
    let url = link.getAttribute("routerLink");

    expect(url).toBe('owners/'+id);
  });
*/
  it('should find edit and delete button in the visit-table', function() {
      const table = document.getElementById('visit-list-table') as HTMLTableElement;
      let editButtonExists = false;
      let deleteButtonExists = false;

      // Loop through all rows in the table
      for (let i = 0, row; row = table.rows[i]; i++) {
        // Loop through all cells in the row
        for (let j = 0, cell; cell = row.cells[j]; j++) {
          if (document.getElementById('editButton') != null){
            editButtonExists = true;
          }
          if (document.getElementById('deleteButton') != null){
            deleteButtonExists = true;
          }
        }
      }

      expect(editButtonExists).toBeTruthy();
      expect(deleteButtonExists).toBeTruthy();
    });
});
