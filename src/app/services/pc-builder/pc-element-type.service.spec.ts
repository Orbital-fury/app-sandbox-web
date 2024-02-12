import { TestBed } from '@angular/core/testing';

import { PcElementTypeService } from './pc-element-type.service';

describe('PcElementTypeService', () => {
  let service: PcElementTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PcElementTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
