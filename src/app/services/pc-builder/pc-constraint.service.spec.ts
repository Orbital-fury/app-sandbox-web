import { TestBed } from '@angular/core/testing';

import { PcConstraintService } from './pc-constraint.service';

describe('PcConstraintService', () => {
  let service: PcConstraintService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PcConstraintService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
