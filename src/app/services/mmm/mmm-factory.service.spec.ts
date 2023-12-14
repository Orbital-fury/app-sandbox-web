import { TestBed } from '@angular/core/testing';

import { MmmFactoryService } from './mmm-factory.service';

describe('MmmFactoryService', () => {
  let service: MmmFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MmmFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
