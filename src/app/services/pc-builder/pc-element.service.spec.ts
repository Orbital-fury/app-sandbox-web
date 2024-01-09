import { TestBed } from '@angular/core/testing';

import { PcElementService } from './pc-element.service';

describe('PcElementService', () => {
  let service: PcElementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PcElementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
