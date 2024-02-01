import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { PcConstraintService } from 'src/app/services/pc-builder/pc-constraint.service';
import * as fromPcConstraintsActions from './pc-constraints.actions';

@Injectable()
export class PcConstraintsEffects {

  constructor(private actions$: Actions, private pcConstraintService: PcConstraintService, private router: Router) { }

  loadPcConstraints$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPcConstraintsActions.loadPcConstraints, fromPcConstraintsActions.deletePcConstraintSuccess),
      switchMap(() => this.pcConstraintService.getPcConstraints().pipe(
        map(pcConstraints => fromPcConstraintsActions.loadPcConstraintsSuccess({ pcConstraints })),
        catchError(error => of(fromPcConstraintsActions.loadPcConstraintsFailure({ error })))
      ))
    )
  );

  loadPcConstraintsFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPcConstraintsActions.loadPcConstraintsFailure),
      tap(() => console.log("loadPcConstraintsFailure"))
    ), { dispatch: false }
  );

  loadSinglePcConstraint$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPcConstraintsActions.loadSinglePcConstraint),
      switchMap(payload => this.pcConstraintService.getPcConstraint(payload.pcConstraintId).pipe(
        map(pcConstraint => fromPcConstraintsActions.loadSinglePcConstraintSuccess({ pcConstraint })),
        catchError(error => of(fromPcConstraintsActions.loadSinglePcConstraintFailure({ error })))
      ))
    )
  );

  loadSinglePcConstraintFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPcConstraintsActions.loadSinglePcConstraintFailure),
      tap(() => console.log("loadSinglePcConstraintFailure"))
    ), { dispatch: false }
  );

  loadPcElementsConstraintValues$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPcConstraintsActions.loadPcElementsConstraintValues),
      switchMap(payload => this.pcConstraintService.getPcElementAndConstraintValues(payload.pcConstraintId).pipe(
        map(pcElements => fromPcConstraintsActions.loadPcElementsConstraintValuesSuccess({ pcElements })),
        catchError(error => of(fromPcConstraintsActions.loadPcElementsConstraintValuesFailure({ error })))
      ))
    )
  );

  loadPcElementsConstraintValuesFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPcConstraintsActions.loadPcElementsConstraintValuesFailure),
      tap(() => console.log("loadPcElementsConstraintValuesFailure"))
    ), { dispatch: false }
  );

  addPcConstraint$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPcConstraintsActions.createPcConstraint),
      switchMap(payload => this.pcConstraintService.createPcConstraint(payload.newPcConstraint).pipe(
        map(pcConstraint => fromPcConstraintsActions.createPcConstraintSuccess({ pcConstraint })),
        catchError(error => of(fromPcConstraintsActions.createPcConstraintFailure({ error })))
      ))
    )
  );

  addPcConstraintSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPcConstraintsActions.createPcConstraintSuccess),
      tap(payload => {
        this.router.navigate(['/pc-builder/manage/pc-constraints']);
        console.log("PC constraint created successfully:", payload.pcConstraint.name);
      })
    ), { dispatch: false }
  );

  addPcConstraintFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPcConstraintsActions.createPcConstraintFailure),
      tap(() => console.log("createPcConstraintFailure"))
    ), { dispatch: false }
  );

  updatePcConstraint$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPcConstraintsActions.updatePcConstraint),
      switchMap(payload => this.pcConstraintService.updatePcConstraint(payload.pcConstraint).pipe(
        map(pcConstraint => fromPcConstraintsActions.updatePcConstraintSuccess({ pcConstraint })),
        catchError(error => of(fromPcConstraintsActions.updatePcConstraintFailure({ error })))
      ))
    )
  );

  updatePcConstraintSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPcConstraintsActions.updatePcConstraintSuccess),
      tap(payload => {
        this.router.navigate(['/pc-builder/manage/pc-constraints']);
        console.log("PC constraint updated successfully:", payload.pcConstraint.name);
      })
    ), { dispatch: false }
  );

  updatePcConstraintFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPcConstraintsActions.updatePcConstraintFailure),
      tap(() => console.log("updatePcConstraintFailure"))
    ), { dispatch: false }
  );

  deletePcConstraint$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPcConstraintsActions.deletePcConstraint),
      switchMap(payload => this.pcConstraintService.deletePcConstraint(payload.pcConstraintId).pipe(
        map(pcConstraint => fromPcConstraintsActions.deletePcConstraintSuccess({ pcConstraint })),
        catchError(error => of(fromPcConstraintsActions.deletePcConstraintFailure({ error })))
      ))
    )
  );

  deletePcConstraintSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPcConstraintsActions.deletePcConstraintSuccess),
      tap(payload => {
        this.router.navigate(['/pc-builder/manage/pc-constraints']);
        console.log("PC constraint deleted successfully:", payload.pcConstraint.name);
      })
    ), { dispatch: false }
  );

  deletePcConstraintFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPcConstraintsActions.deletePcConstraintFailure),
      tap(() => console.log("deletePcConstraintFailure"))
    ), { dispatch: false }
  );

}
