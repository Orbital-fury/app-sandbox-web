import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePcConstraintComponent } from './update-pc-constraint.component';

describe('UpdatePcConstraintComponent', () => {
  let component: UpdatePcConstraintComponent;
  let fixture: ComponentFixture<UpdatePcConstraintComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdatePcConstraintComponent]
    });
    fixture = TestBed.createComponent(UpdatePcConstraintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
