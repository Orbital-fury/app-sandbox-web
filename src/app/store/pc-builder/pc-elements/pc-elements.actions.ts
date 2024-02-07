import { createAction, props } from '@ngrx/store';
import { ApiError } from 'src/app/services/api-response.service';
import { PcElement, PcElementBasis, PcElementType } from 'src/typing-pc-builder';

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

export const createPcElement = createAction(
  '[PC Element] Create PcElement',
  props<{ newPcElement: PcElement }>()
);

export const createPcElementSuccess = createAction(
  '[PC Element] Create PcElement Success',
  props<{ pcElement: PcElement }>()
);

export const createPcElementFailure = createAction(
  '[PC Element] Create PcElement Failure',
  props<{ error: ApiError }>()
);

export const updatePcElement = createAction(
  '[PC Element] Update PcElement',
  props<{ pcElement: PcElement }>()
);

export const updatePcElementSuccess = createAction(
  '[PC Element] Update PcElement Success',
  props<{ pcElement: PcElement }>()
);

export const updatePcElementFailure = createAction(
  '[PC Element] Update PcElement Failure',
  props<{ error: ApiError }>()
);

export const deletePcElement = createAction(
  '[PC Element] Delete PcElement',
  props<{ pcElementId: number }>()
);

export const deletePcElementSuccess = createAction(
  '[PC Element] Delete PcElement Success',
  props<{ pcElement: PcElementBasis }>()
);

export const deletePcElementFailure = createAction(
  '[PC Element] Delete PcElement Failure',
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
