import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PcElementTypesState } from './pc-element-types.state';

// export const getPcElementState = (state: PcElementState) => state;
export const getPcElementTypesState = createFeatureSelector<PcElementTypesState>('pcElementTypes');

export const selectLoadingPcElementTypes = createSelector(getPcElementTypesState, state => state.loadingPcElementTypes);

export const selectPcElementTypes = createSelector(getPcElementTypesState, state => state.pcElementTypes);
