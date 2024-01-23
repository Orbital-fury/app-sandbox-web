import { createReducer, on } from '@ngrx/store';
import * as fromPcConstraintsActions from './pc-constraints.actions';
import { pcConstraintsState } from './pc-constraints.state';

export const reducer = createReducer(
  pcConstraintsState,

  on(fromPcConstraintsActions.loadPcConstraints, (state) => ({
    ...state,
    loadingPcConstraints: true
  })),
  on(fromPcConstraintsActions.loadPcConstraintsSuccess, (state, { pcConstraints }) => ({
    ...state,
    loadingPcConstraints: false,
    pcConstraints,
    error: ''
  })),
  on(fromPcConstraintsActions.loadPcConstraintsFailure, (state, { error }) => ({
    ...state,
    loadingPcConstraints: false,
    pcElements: [],
    error
  }))
);
