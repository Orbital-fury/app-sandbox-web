import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { machineResolver } from './machine.resolver';

describe('machineResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => machineResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
