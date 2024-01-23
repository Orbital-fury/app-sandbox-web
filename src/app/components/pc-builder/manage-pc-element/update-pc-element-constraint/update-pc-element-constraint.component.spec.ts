import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePcElementConstraintComponent } from './update-pc-element-constraint.component';

describe('UpdatePcElementConstraintComponent', () => {
  let component: UpdatePcElementConstraintComponent;
  let fixture: ComponentFixture<UpdatePcElementConstraintComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdatePcElementConstraintComponent]
    });
    fixture = TestBed.createComponent(UpdatePcElementConstraintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
