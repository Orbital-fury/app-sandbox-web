import { TestBed } from '@angular/core/testing';

import { MachineMetricService } from './machine-metric.service';

describe('MachineMetricService', () => {
  let service: MachineMetricService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MachineMetricService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
