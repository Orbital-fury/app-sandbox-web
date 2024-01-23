import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePcConstraintComponent } from './manage-pc-constraint.component';

describe('ManagePcConstraintComponent', () => {
  let component: ManagePcConstraintComponent;
  let fixture: ComponentFixture<ManagePcConstraintComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagePcConstraintComponent]
    });
    fixture = TestBed.createComponent(ManagePcConstraintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
