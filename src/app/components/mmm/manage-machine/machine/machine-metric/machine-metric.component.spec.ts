import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineMetricComponent } from './machine-metric.component';

describe('MachineMetricComponent', () => {
  let component: MachineMetricComponent;
  let fixture: ComponentFixture<MachineMetricComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MachineMetricComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MachineMetricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
