import { ActionReducerMap } from '@ngrx/store';
import { PcConstraintsEffects } from './pc-builder/pc-constraints/pc-constraints.effects';
import * as fromPcConstraintsReducer from './pc-builder/pc-constraints/pc-constraints.reducer';
import { PcConstraintsState } from './pc-builder/pc-constraints/pc-constraints.state';
import { PcElementTypesEffects } from './pc-builder/pc-element-types/pc-element-types.effects';
import * as fromPcElementTypesReducer from './pc-builder/pc-element-types/pc-element-types.reducer';
import { PcElementTypesState } from './pc-builder/pc-element-types/pc-element-types.state';
import { PcElementsEffects } from './pc-builder/pc-elements/pc-elements.effects';
import * as fromPcElementsReducer from './pc-builder/pc-elements/pc-elements.reducer';
import { PcElementsState } from './pc-builder/pc-elements/pc-elements.state';

export interface AppState {
    pcElements: PcElementsState;
    pcConstraints: PcConstraintsState;
    pcElementTypes: PcElementTypesState;
};

export const reducers: ActionReducerMap<AppState> = {
    pcElements: fromPcElementsReducer.reducer,
    pcConstraints: fromPcConstraintsReducer.reducer,
    pcElementTypes: fromPcElementTypesReducer.reducer
};

export const effects = [
    PcElementsEffects,
    PcConstraintsEffects,
    PcElementTypesEffects
];
