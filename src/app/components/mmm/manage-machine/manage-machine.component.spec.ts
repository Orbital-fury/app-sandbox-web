import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageMachineComponent } from './manage-machine.component';

describe('ManageMachineComponent', () => {
  let component: ManageMachineComponent;
  let fixture: ComponentFixture<ManageMachineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageMachineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageMachineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
