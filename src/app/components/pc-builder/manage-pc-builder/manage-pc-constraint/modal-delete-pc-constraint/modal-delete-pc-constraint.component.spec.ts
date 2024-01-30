import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDeletePcConstraintComponent } from './modal-delete-pc-constraint.component';

describe('ModalDeletePcConstraintComponent', () => {
  let component: ModalDeletePcConstraintComponent;
  let fixture: ComponentFixture<ModalDeletePcConstraintComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalDeletePcConstraintComponent]
    });
    fixture = TestBed.createComponent(ModalDeletePcConstraintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
