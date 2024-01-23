import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { PcConstraintsEffects } from './pc-constraints.effects';


describe('PcElementEffects', () => {
  let actions$: Observable<any>;
  let effects: PcConstraintsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PcConstraintsEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(PcConstraintsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
