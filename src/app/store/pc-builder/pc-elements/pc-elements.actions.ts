import { createAction, props } from '@ngrx/store';
import { ApiError } from 'src/app/shared/services/api-response.service';
import { PcElement, PcElementType } from 'src/typing-pc-builder';

export const loadPcElements = createAction(
  '[PC Elements] Load PcElements'
);

export const loadPcElementsSuccess = createAction(
  '[PC Elements] Load PcElements Success',
  props<{ pcElements: PcElement[] }>()
);

export const loadPcElementsFailure = createAction(
  '[PC Elements] Load PcElements Failure',
  props<{ error: ApiError }>()
);

export const loadSinglePcElement = createAction(
  '[PC Element] Load Single PcElement',
  props<{ pcElementId: number }>()
);

export const loadSinglePcElementSuccess = createAction(
  '[PC Element] Load Single PcElement Success',
  props<{ pcElement: PcElement }>()
);

export const loadSinglePcElementFailure = createAction(
  '[PC Element] Load Single PcElement Failure',
  props<{ error: ApiError }>()
);

export const addPcElementToBuild = createAction(
  '[PC Build Elements] Add PC element to PcBuildElements',
  props<{ pcElement: PcElement }>()
);

export const removePcElementFromBuild = createAction(
  '[PC Build Elements] Remove PC element from PcBuildElements',
  props<{ pcElement: PcElement }>()
);

export const changeSelectedPcElementType = createAction(
  '[Select PC Element Type] Change PC element type selection',
  props<{ pcElementType: PcElementType }>()
);
