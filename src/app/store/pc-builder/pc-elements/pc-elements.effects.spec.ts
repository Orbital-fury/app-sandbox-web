import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { PcElementsEffects } from './pc-elements.effects';

describe('PcElementEffects', () => {
  let actions$: Observable<any>;
  let effects: PcElementsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PcElementsEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(PcElementsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
