import { createAction, props } from '@ngrx/store';
import { PcElement } from 'src/typing-pc-builder';

export const loadPcElements = createAction(
  '[PC Elements] Load PcElements'
);

export const loadPcElementsSuccess = createAction(
  '[PC Elements] Load PcElements Success',
  props<{ pcElements: PcElement[] }>()
);

export const loadPcElementsFailure = createAction(
  '[PC Elements] Load PcElements Failure',
  props<{ error: any }>()
);

export const changePcBuildElements = createAction(
  '[PC Build Elements] Change PcBuildElements',
  props<{ pcBuildElements: PcElement[] }>()
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
  props<{ error: any }>()
);
