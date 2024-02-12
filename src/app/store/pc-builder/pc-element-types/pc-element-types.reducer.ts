import { createReducer, on } from '@ngrx/store';
import * as fromPcElementTypesActions from './pc-element-types.actions';
import { pcElementTypesState } from './pc-element-types.state';

export const reducer = createReducer(
    pcElementTypesState,

    on(fromPcElementTypesActions.loadPcElementTypes, (state) => ({
        ...state,
        loadingPcElementTypes: true
    })),
    on(fromPcElementTypesActions.loadPcElementTypesSuccess, (state, { pcElementTypes }) => ({
        ...state,
        loadingPcElementTypes: false,
        pcElementTypes,
        error: undefined
    })),
    on(fromPcElementTypesActions.loadPcElementTypesFailure, (state, { error }) => ({
        ...state,
        loadingPcElementTypes: false,
        pcElementTypes: [],
        error
    }))
);
