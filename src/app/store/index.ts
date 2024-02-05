import { ActionReducerMap } from '@ngrx/store';
import { PcConstraintsEffects } from './pc-builder/pc-constraints/pc-constraints.effects';
import * as fromPcConstraintsReducer from './pc-builder/pc-constraints/pc-constraints.reducer';
import { PcConstraintsState } from './pc-builder/pc-constraints/pc-constraints.state';
import { PcElementsEffects } from './pc-builder/pc-elements/pc-elements.effects';
import * as fromPcElementsReducer from './pc-builder/pc-elements/pc-elements.reducer';
import { PcElementsState } from './pc-builder/pc-elements/pc-elements.state';

export interface AppState {
  pcElements: PcElementsState;
  pcConstraints: PcConstraintsState;
};

export const reducers: ActionReducerMap<AppState> = {
  pcElements: fromPcElementsReducer.reducer,
  pcConstraints: fromPcConstraintsReducer.reducer
};

export const effects = [
  PcElementsEffects,
  PcConstraintsEffects
];
