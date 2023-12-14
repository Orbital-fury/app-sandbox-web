import { TestBed } from '@angular/core/testing';

import { MmmMeasureService } from './mmm-measure.service';

describe('MmmMeasureService', () => {
  let service: MmmMeasureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MmmMeasureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
