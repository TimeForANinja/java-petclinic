import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VisitOwnerDetailComponent } from './visit-owner-detail.component';
//import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ENGINE_METHOD_PKEY_ASN1_METHS } from 'constants';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
//import { OwnerService } from '../owner.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivatedRouteStub, RouterStub } from '../../testing/router-stubs';
//import { Owner } from '../owner';
import { Observable, of } from 'rxjs';


describe('VisitOwnerDetailComponent', () => {
  let component: VisitOwnerDetailComponent;
  let fixture: ComponentFixture<VisitOwnerDetailComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitOwnerDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitOwnerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
