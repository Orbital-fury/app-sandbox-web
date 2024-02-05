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
    error: undefined
  })),
  on(fromPcConstraintsActions.loadPcConstraintsFailure, (state, { error }) => ({
    ...state,
    loadingPcConstraints: false,
    pcElements: [],
    error
  })),

  on(fromPcConstraintsActions.loadSinglePcConstraint, (state) => ({
    ...state,
    loadingSinglePcConstraint: true
  })),
  on(fromPcConstraintsActions.loadSinglePcConstraintSuccess, (state, { pcConstraint }) => ({
    ...state,
    loadingSinglePcConstraint: false,
    singlePcConstraint: pcConstraint,
    error: undefined
  })),
  on(fromPcConstraintsActions.loadSinglePcConstraintFailure, (state, { error }) => ({
    ...state,
    loadingSinglePcConstraint: false,
    singlePcConstraint: undefined,
    error
  })),

  on(fromPcConstraintsActions.loadPcElementsConstraintValues, (state) => ({
    ...state,
    loadingPcElementsConstraintValues: true
  })),
  on(fromPcConstraintsActions.loadPcElementsConstraintValuesSuccess, (state, { pcElements }) => ({
    ...state,
    loadingPcElementsConstraintValues: false,
    pcElementsConstraintValues: pcElements,
    error: undefined
  })),
  on(fromPcConstraintsActions.loadPcElementsConstraintValuesFailure, (state, { error }) => ({
    ...state,
    loadingPcElementsConstraintValues: false,
    pcElementsConstraintValues: [],
    error
  })),
);
