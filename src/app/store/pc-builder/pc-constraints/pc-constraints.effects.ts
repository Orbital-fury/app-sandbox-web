import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { PcConstraintService } from 'src/app/services/pc-builder/pc-constraint.service';
import { CustomToastrService } from 'src/app/shared/components/toast/custom-toastr.service';
import * as fromPcConstraintsActions from './pc-constraints.actions';
import { ApiResponseService } from 'src/app/shared/services/api-response.service';

@Injectable()
export class PcConstraintsEffects {

  constructor(
    private actions$: Actions,
    private pcConstraintService: PcConstraintService,
    private router: Router,
    private readonly apiResponseService: ApiResponseService
  ) { }

  loadPcConstraints$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPcConstraintsActions.loadPcConstraints, fromPcConstraintsActions.deletePcConstraintSuccess),
      switchMap(() => this.pcConstraintService.getPcConstraints().pipe(
        map(pcConstraints => fromPcConstraintsActions.loadPcConstraintsSuccess({ pcConstraints })),
        catchError((error: HttpErrorResponse) => of(fromPcConstraintsActions.loadPcConstraintsFailure({ error: error.error })))
      ))
    )
  );

  loadPcConstraintsFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPcConstraintsActions.loadPcConstraintsFailure),
      tap((payload) => this.apiResponseService.launchApiError(payload.error))
    ), { dispatch: false }
  );

  loadSinglePcConstraint$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPcConstraintsActions.loadSinglePcConstraint),
      switchMap(payload => this.pcConstraintService.getPcConstraint(payload.pcConstraintId).pipe(
        map(pcConstraint => fromPcConstraintsActions.loadSinglePcConstraintSuccess({ pcConstraint })),
        catchError((error: HttpErrorResponse) => of(fromPcConstraintsActions.loadSinglePcConstraintFailure({ error: error.error })))
      ))
    )
  );

  loadSinglePcConstraintFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPcConstraintsActions.loadSinglePcConstraintFailure),
      tap((payload) => this.apiResponseService.launchApiError(payload.error))
    ), { dispatch: false }
  );

  loadPcElementsConstraintValues$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPcConstraintsActions.loadPcElementsConstraintValues),
      switchMap(payload => this.pcConstraintService.getPcElementAndConstraintValues(payload.pcConstraintId).pipe(
        map(pcElements => fromPcConstraintsActions.loadPcElementsConstraintValuesSuccess({ pcElements })),
        catchError((error: HttpErrorResponse) => of(fromPcConstraintsActions.loadPcElementsConstraintValuesFailure({ error: error.error })))
      ))
    )
  );

  loadPcElementsConstraintValuesFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPcConstraintsActions.loadPcElementsConstraintValuesFailure),
      tap((payload) => this.apiResponseService.launchApiError(payload.error))
    ), { dispatch: false }
  );

  addPcConstraint$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPcConstraintsActions.createPcConstraint),
      switchMap(payload => this.pcConstraintService.createPcConstraint(payload.newPcConstraint).pipe(
        map(pcConstraint => fromPcConstraintsActions.createPcConstraintSuccess({ pcConstraint })),
        catchError((error: HttpErrorResponse) => of(fromPcConstraintsActions.createPcConstraintFailure({ error: error.error })))
      ))
    )
  );

  addPcConstraintSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPcConstraintsActions.createPcConstraintSuccess),
      tap(payload => {
        this.router.navigate(['/pc-builder/manage/pc-constraints']);
        this.apiResponseService.launchApiSuccess('Creation successful', `PC constraint '${payload.pcConstraint.name}' created successfully`)
      })
    ), { dispatch: false }
  );

  addPcConstraintFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPcConstraintsActions.createPcConstraintFailure),
      tap((payload) => this.apiResponseService.launchApiError(payload.error))
    ), { dispatch: false }
  );

  updatePcConstraint$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPcConstraintsActions.updatePcConstraint),
      switchMap(payload => this.pcConstraintService.updatePcConstraint(payload.pcConstraint).pipe(
        map(pcConstraint => fromPcConstraintsActions.updatePcConstraintSuccess({ pcConstraint })),
        catchError((error: HttpErrorResponse) => of(fromPcConstraintsActions.updatePcConstraintFailure({ error: error.error })))
      ))
    )
  );

  updatePcConstraintSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPcConstraintsActions.updatePcConstraintSuccess),
      tap(payload => {
        this.router.navigate(['/pc-builder/manage/pc-constraints']);
        this.apiResponseService.launchApiSuccess('Update successful', `PC constraint '${payload.pcConstraint.name}' updated successfully`)
      })
    ), { dispatch: false }
  );

  updatePcConstraintFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPcConstraintsActions.updatePcConstraintFailure),
      tap((payload) => this.apiResponseService.launchApiError(payload.error))
    ), { dispatch: false }
  );

  deletePcConstraint$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPcConstraintsActions.deletePcConstraint),
      switchMap(payload => this.pcConstraintService.deletePcConstraint(payload.pcConstraintId).pipe(
        map(pcConstraint => fromPcConstraintsActions.deletePcConstraintSuccess({ pcConstraint })),
        catchError((error: HttpErrorResponse) => of(fromPcConstraintsActions.deletePcConstraintFailure({ error: error.error })))
      ))
    )
  );

  deletePcConstraintSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPcConstraintsActions.deletePcConstraintSuccess),
      tap(payload => {
        this.apiResponseService.launchApiSuccess('Deletion successful', `PC constraint '${payload.pcConstraint.name}' deleted successfully`)
      })
    ), { dispatch: false }
  );

  deletePcConstraintFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPcConstraintsActions.deletePcConstraintFailure),
      tap((payload) => this.apiResponseService.launchApiError(payload.error))
    ), { dispatch: false }
  );

}
