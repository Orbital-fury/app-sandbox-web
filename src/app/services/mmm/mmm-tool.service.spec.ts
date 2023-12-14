import { TestBed } from '@angular/core/testing';

import { MmmToolService } from './mmm-tool.service';

describe('MmmToolService', () => {
  let service: MmmToolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MmmToolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
