import { TestBed } from '@angular/core/testing';

import { MmmPartService } from './mmm-part.service';

describe('MmmPartService', () => {
  let service: MmmPartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MmmPartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
