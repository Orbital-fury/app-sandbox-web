import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { pcConstraintResolver } from './pc-constraint.resolver';

describe('pcConstraintBreadcrumbResolver', () => {
    const executeResolver: ResolveFn<string> = (...resolverParameters) =>
        TestBed.runInInjectionContext(() => pcConstraintResolver(...resolverParameters));

    beforeEach(() => {
        TestBed.configureTestingModule({});
    });

    it('should be created', () => {
        expect(executeResolver).toBeTruthy();
    });
});
