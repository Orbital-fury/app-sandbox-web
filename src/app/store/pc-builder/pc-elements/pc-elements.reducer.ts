import { createReducer, on } from '@ngrx/store';
import * as fromPcElementActions from './pc-elements.actions';
import { pcElementsState } from './pc-elements.state';

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

  on(fromPcElementActions.addPcElementToBuild, (state, { pcElement }) => ({
    ...state,
    pcBuildElements: [...state.pcBuildElements, pcElement]
  })),
  on(fromPcElementActions.removePcElementFromBuild, (state, { pcElement }) => {
    const index = state.pcBuildElements.findIndex(pcBuildElement => pcBuildElement === pcElement);
    if (index !== -1) {
      const updatedPcBuildElements = [
        ...state.pcBuildElements.slice(0, index),
        ...state.pcBuildElements.slice(index + 1)
      ];

      return {
        ...state,
        pcBuildElements: updatedPcBuildElements
      };
    }
    return state;
  }),

  on(fromPcElementActions.changeSelectedPcElementType, (state, { pcElementType }) => ({
    ...state,
    selectedPcElementType: pcElementType
  }))
);
