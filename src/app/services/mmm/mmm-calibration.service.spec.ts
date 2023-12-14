import { TestBed } from '@angular/core/testing';

import { MmmCalibrationService } from './mmm-calibration.service';

describe('MmmCalibrationService', () => {
  let service: MmmCalibrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MmmCalibrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
