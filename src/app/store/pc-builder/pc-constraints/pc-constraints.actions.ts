import { createAction, props } from '@ngrx/store';
import { PcConstraint } from 'src/typing-pc-builder';

export const loadPcConstraints = createAction(
  '[PC Constraints] Load PcConstraints'
);

export const loadPcConstraintsSuccess = createAction(
  '[PC Constraints] Load PcConstraints Success',
  props<{ pcConstraints: PcConstraint[] }>()
);

export const loadPcConstraintsFailure = createAction(
  '[PC Constraints] Load PcConstraints Failure',
  props<{ error: any }>()
);
