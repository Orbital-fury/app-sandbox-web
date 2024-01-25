import { createAction, props } from '@ngrx/store';
import { NewPcConstraint, PcConstraint } from 'src/typing-pc-builder';

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

export const createPcConstraint = createAction(
  '[PC Constraint] Create PcConstraint',
  props<{ newPcConstraint: NewPcConstraint }>()
);

export const createPcConstraintSuccess = createAction(
  '[PC Constraint] Create PcConstraint Success',
  props<{ newPcConstraintId: number }>()
);

export const createPcConstraintFailure = createAction(
  '[PC Constraint] Create PcConstraint Failure',
  props<{ error: any }>()
);