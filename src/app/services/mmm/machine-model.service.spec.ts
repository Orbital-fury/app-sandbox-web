import { TestBed } from '@angular/core/testing';

import { MachineModelService } from './machine-model.service';

describe('MachineModelService', () => {
  let service: MachineModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MachineModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
