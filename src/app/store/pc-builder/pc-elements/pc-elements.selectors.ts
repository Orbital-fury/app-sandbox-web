import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PcElementsState } from './pc-elements.state';

// export const getPcElementState = (state: PcElementState) => state;
export const getPcElementsState = createFeatureSelector<PcElementsState>('pcElements');

export const selectLoadingPcElements = createSelector(getPcElementsState, state => state.loadingPcElements);

export const selectPcElements = createSelector(getPcElementsState, state => state.pcElements);

export const selectPcBuildElements = createSelector(getPcElementsState, state => state.pcBuildElements);

export const selectLoadingSinglePcElement = createSelector(getPcElementsState, state => state.loadingSinglePcElement);

export const selectSinglePcElement = createSelector(getPcElementsState, state => state.singlePcElement);

export const selectSelectedPcElementType = createSelector(getPcElementsState, state => state.selectedPcElementType);
