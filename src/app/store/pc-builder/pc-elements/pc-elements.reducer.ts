import { createReducer, on } from '@ngrx/store';
import * as fromPcElementsActions from './pc-elements.actions';
import { pcElementsState } from './pc-elements.state';

export const reducer = createReducer(
  pcElementsState,

  on(fromPcElementsActions.loadPcElements, (state) => ({
    ...state,
    loadingPcElements: true
  })),
  on(fromPcElementsActions.loadPcElementsSuccess, (state, { pcElements }) => ({
    ...state,
    loadingPcElements: false,
    pcElements,
    error: ''
  })),
  on(fromPcElementsActions.loadPcElementsFailure, (state, { error }) => ({
    ...state,
    loadingPcElements: false,
    pcElements: [],
    error
  })),

  on(fromPcElementsActions.loadSinglePcElement, (state) => ({
    ...state,
    loadingSinglePcElement: true
  })),
  on(fromPcElementsActions.loadSinglePcElementSuccess, (state, { pcElement }) => ({
    ...state,
    loadingSinglePcElement: false,
    singlePcElement: pcElement,
    error: ''
  })),
  on(fromPcElementsActions.loadSinglePcElementFailure, (state, { error }) => ({
    ...state,
    loadingSinglePcElement: false,
    singlePcElement: undefined,
    error
  })),

  on(fromPcElementsActions.addPcElementToBuild, (state, { pcElement }) => ({
    ...state,
    pcBuildElements: [...state.pcBuildElements, pcElement]
  })),
  on(fromPcElementsActions.removePcElementFromBuild, (state, { pcElement }) => {
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

  on(fromPcElementsActions.changeSelectedPcElementType, (state, { pcElementType }) => ({
    ...state,
    selectedPcElementType: pcElementType
  }))
);
