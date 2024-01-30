import { createAction, props } from '@ngrx/store';
import { NewPcConstraint, PcConstraintWithoutValue } from 'src/typing-pc-builder';

export const loadPcConstraints = createAction(
  '[PC Constraints] Load PcConstraints'
);

export const loadPcConstraintsSuccess = createAction(
  '[PC Constraints] Load PcConstraints Success',
  props<{ pcConstraints: PcConstraintWithoutValue[] }>()
);

export const loadPcConstraintsFailure = createAction(
  '[PC Constraints] Load PcConstraints Failure',
  props<{ error: any }>()
);

export const loadSinglePcConstraint = createAction(
  '[PC Constraint] Load Single PcConstraint',
  props<{ pcConstraintId: number }>()
);

export const loadSinglePcConstraintSuccess = createAction(
  '[PC Constraint] Load Single PcConstraint Success',
  props<{ pcConstraint: PcConstraintWithoutValue }>()
);

export const loadSinglePcConstraintFailure = createAction(
  '[PC Constraint] Load Single PcConstraint Failure',
  props<{ error: any }>()
);

export const createPcConstraint = createAction(
  '[PC Constraint] Create PcConstraint',
  props<{ newPcConstraint: NewPcConstraint }>()
);

export const createPcConstraintSuccess = createAction(
  '[PC Constraint] Create PcConstraint Success',
  props<{ pcConstraint: PcConstraintWithoutValue }>()
);

export const createPcConstraintFailure = createAction(
  '[PC Constraint] Create PcConstraint Failure',
  props<{ error: any }>()
);

export const updatePcConstraint = createAction(
  '[PC Constraint] Update PcConstraint',
  props<{ pcConstraint: PcConstraintWithoutValue }>()
);

export const updatePcConstraintSuccess = createAction(
  '[PC Constraint] Update PcConstraint Success',
  props<{ pcConstraint: PcConstraintWithoutValue }>()
);

export const updatePcConstraintFailure = createAction(
  '[PC Constraint] Update PcConstraint Failure',
  props<{ error: any }>()
);

export const deletePcConstraint = createAction(
  '[PC Constraint] Delete PcConstraint',
  props<{ pcConstraintId: number }>()
);

export const deletePcConstraintSuccess = createAction(
  '[PC Constraint] Delete PcConstraint Success',
  props<{ pcConstraintName: string }>()
);

export const deletePcConstraintFailure = createAction(
  '[PC Constraint] Delete PcConstraint Failure',
  props<{ error: any }>()
);
