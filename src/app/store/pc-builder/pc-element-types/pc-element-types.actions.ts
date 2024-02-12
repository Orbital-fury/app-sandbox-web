import { createAction, props } from '@ngrx/store';
import { ApiError } from 'src/app/services/api-response.service';
import { PcElement, PcElementType } from 'src/typing-pc-builder';

export const loadPcElementTypes = createAction(
    '[PC Element types] Load PcElementTypes'
);

export const loadPcElementTypesSuccess = createAction(
    '[PC Element types] Load PcElementTypes Success',
    props<{ pcElementTypes: PcElementType[] }>()
);

export const loadPcElementTypesFailure = createAction(
    '[PC Element types] Load PcElementTypes Failure',
    props<{ error: ApiError }>()
);
