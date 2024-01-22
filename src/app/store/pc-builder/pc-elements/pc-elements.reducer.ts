import { createReducer, on } from '@ngrx/store';
import * as fromPcElementActions from './pc-elements.actions';
import { pcElementsState as pcElementsState } from './pc-elements.state';

export const reducer = createReducer(
  pcElementsState,
  on(fromPcElementActions.loadPcElements, (state) => ({
    ...state,
    loadingPcElements: true
  })),
  on(fromPcElementActions.loadPcElementsSuccess, (state, { pcElements }) => ({
    ...state,
    loadingPcElements: false,
    pcElements,
    error: ''
  })),
  on(fromPcElementActions.loadPcElementsFailure, (state, { error }) => ({
    ...state,
    loadingPcElements: false,
    pcElements: [],
    error
  })),
  on(fromPcElementActions.changePcBuildElements, (state, { pcBuildElements }) => ({
    ...state,
    pcBuildElements
  })),
  on(fromPcElementActions.loadSinglePcElement, (state) => ({
    ...state,
    loadingSinglePcElement: true
  })),
  on(fromPcElementActions.loadSinglePcElementSuccess, (state, { pcElement }) => ({
    ...state,
    loadingSinglePcElement: false,
    singlePcElement: pcElement,
    error: ''
  })),
  on(fromPcElementActions.loadSinglePcElementFailure, (state, { error }) => ({
    ...state,
    loadingSinglePcElement: false,
    singlePcElement: undefined,
    error
  })),
);
