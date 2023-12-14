import { TestBed } from '@angular/core/testing';

import { MachineBrandService } from './machine-brand.service';

describe('MachineBrandService', () => {
  let service: MachineBrandService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MachineBrandService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
