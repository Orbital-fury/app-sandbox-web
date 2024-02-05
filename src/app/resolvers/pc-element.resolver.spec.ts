import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { pcElementResolver } from './pc-element.resolver';

describe('pcElementBreadcrumbResolver', () => {
  const executeResolver: ResolveFn<string> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => pcElementResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
