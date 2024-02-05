import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDeletePcElementComponent } from './modal-delete-pc-element.component';

describe('ModalDeletePcElementComponent', () => {
  let component: ModalDeletePcElementComponent;
  let fixture: ComponentFixture<ModalDeletePcElementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalDeletePcElementComponent]
    });
    fixture = TestBed.createComponent(ModalDeletePcElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
