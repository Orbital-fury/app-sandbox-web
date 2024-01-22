import { ActionReducerMap } from '@ngrx/store';
import { PcElementsEffects } from './pc-elements/pc-elements.effects';
import * as fromPcElementsReducer from './pc-elements/pc-elements.reducer';
import { PcElementsState } from './pc-elements/pc-elements.state';

export interface AppState {
  pcElements: PcElementsState;
};

export const reducers: ActionReducerMap<AppState> = {
  pcElements: fromPcElementsReducer.reducer
};

export const effects = [
  PcElementsEffects
];
