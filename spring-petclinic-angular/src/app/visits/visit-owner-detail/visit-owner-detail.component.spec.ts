import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitOwnerDetailComponent } from './visit-owner-detail.component';

describe('VisitOwnerDetailComponent', () => {
  let component: VisitOwnerDetailComponent;
  let fixture: ComponentFixture<VisitOwnerDetailComponent>;

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
