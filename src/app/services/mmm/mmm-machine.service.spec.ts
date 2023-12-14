import { TestBed } from '@angular/core/testing';

import { MmmMachineService } from './mmm-machine.service';

describe('MmmMachineService', () => {
  let service: MmmMachineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MmmMachineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
