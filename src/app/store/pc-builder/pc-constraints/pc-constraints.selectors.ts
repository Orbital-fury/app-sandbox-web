import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PcConstraintsState } from './pc-constraints.state';

export const getPcConstraintsState = createFeatureSelector<PcConstraintsState>('pcConstraints');

export const selectLoadingPcConstraints = createSelector(getPcConstraintsState, state => state.loadingPcConstraints);
export const selectPcConstraints = createSelector(getPcConstraintsState, state => state.pcConstraints);

export const selectLoadingSinglePcConstraint = createSelector(getPcConstraintsState, state => state.loadingSinglePcConstraint);
export const selectSinglePcConstraint = createSelector(getPcConstraintsState, state => state.singlePcConstraint);

export const selectLoadingPcElementsConstraintValues = createSelector(getPcConstraintsState, state => state.loadingPcElementsConstraintValues);
export const selectPcElementsConstraintValues = createSelector(getPcConstraintsState, state => state.pcElementsConstraintValues);
