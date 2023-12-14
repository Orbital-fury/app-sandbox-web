import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineCalibrationComponent } from './machine-calibration.component';

describe('MachineCalibrationComponent', () => {
  let component: MachineCalibrationComponent;
  let fixture: ComponentFixture<MachineCalibrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MachineCalibrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MachineCalibrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
