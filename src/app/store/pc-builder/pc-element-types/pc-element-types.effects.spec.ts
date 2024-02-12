import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { PcElementTypesEffects } from './pc-element-types.effects';

describe('PcElementTypesEffects', () => {
    let actions$: Observable<any>;
    let effects: PcElementTypesEffects;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                PcElementTypesEffects,
                provideMockActions(() => actions$)
            ]
        });

        effects = TestBed.inject(PcElementTypesEffects);
    });

    it('should be created', () => {
        expect(effects).toBeTruthy();
    });
});
