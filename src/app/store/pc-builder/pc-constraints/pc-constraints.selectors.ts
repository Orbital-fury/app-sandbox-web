import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PcConstraintsState } from './pc-constraints.state';

export const getPcConstraintsState = createFeatureSelector<PcConstraintsState>('pcConstraints');

export const selectLoadingPcConstraints = createSelector(getPcConstraintsState, state => state.loadingPcConstraints);

export const selectPcConstraints = createSelector(getPcConstraintsState, state => state.pcConstraints);
