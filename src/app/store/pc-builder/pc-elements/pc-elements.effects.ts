import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { PcElementService } from 'src/app/services/pc-builder/pc-element.service';
import { ApiResponseService } from 'src/app/services/api-response.service';
import * as fromPcElementsActions from './pc-elements.actions';
import { CustomToastrService } from 'src/app/shared/components/toast/custom-toastr.service';
import { Router } from '@angular/router';

@Injectable()
export class PcElementsEffects {

  constructor(
    private actions$: Actions,
    private pcElementService: PcElementService,
    private router: Router,
    private readonly apiResponseService: ApiResponseService
  ) { }

  loadPcElements$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPcElementsActions.loadPcElements, fromPcElementsActions.deletePcElementSuccess),
      switchMap(() => this.pcElementService.getPcElements().pipe(
        map(pcElements => fromPcElementsActions.loadPcElementsSuccess({ pcElements })),
        catchError((error: HttpErrorResponse) => of(fromPcElementsActions.loadPcElementsFailure({ error: error.error })))
      ))
    )
  );

  loadPcElementsFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPcElementsActions.loadPcElementsFailure),
      tap((payload) => this.apiResponseService.launchApiError(payload.error))
    ), { dispatch: false }
  );

  loadSinglePcElement$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPcElementsActions.loadSinglePcElement),
      switchMap(payload => this.pcElementService.getPcElement(payload.pcElementId).pipe(
        map(pcElement => fromPcElementsActions.loadSinglePcElementSuccess({ pcElement })),
        catchError((error: HttpErrorResponse) => of(fromPcElementsActions.loadSinglePcElementFailure({ error: error.error })))
      ))
    )
  );

  loadSinglePcElementFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPcElementsActions.loadSinglePcElementFailure),
      tap((payload) => this.apiResponseService.launchApiError(payload.error))
    ), { dispatch: false }
  );

  addPcElement$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPcElementsActions.createPcElement),
      switchMap(payload => this.pcElementService.createPcElement(payload.newPcElement).pipe(
        map(pcElement => fromPcElementsActions.createPcElementSuccess({ pcElement })),
        catchError((error: HttpErrorResponse) => of(fromPcElementsActions.createPcElementFailure({ error: error.error })))
      ))
    )
  );

  addPcElementSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPcElementsActions.createPcElementSuccess),
      tap(payload => {
        this.router.navigate(['/pc-builder/manage/pc-elements']);
        this.apiResponseService.launchApiSuccess('Creation successful', `PC Element '${payload.pcElement.brand} ${payload.pcElement.model}' created successfully`)
      })
    ), { dispatch: false }
  );

  addPcElementFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPcElementsActions.createPcElementFailure),
      tap((payload) => this.apiResponseService.launchApiError(payload.error))
    ), { dispatch: false }
  );

  updatePcElement$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPcElementsActions.updatePcElement),
      switchMap(payload => this.pcElementService.updatePcElement(payload.pcElement).pipe(
        map(pcElement => fromPcElementsActions.updatePcElementSuccess({ pcElement })),
        catchError((error: HttpErrorResponse) => of(fromPcElementsActions.updatePcElementFailure({ error: error.error })))
      ))
    )
  );

  updatePcElementSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPcElementsActions.updatePcElementSuccess),
      tap(payload => {
        this.router.navigate(['/pc-builder/manage/pc-elements']);
        this.apiResponseService.launchApiSuccess('Update successful', `PC Element '${payload.pcElement.brand} ${payload.pcElement.model}' updated successfully`)
      })
    ), { dispatch: false }
  );

  updatePcElementFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPcElementsActions.updatePcElementFailure),
      tap((payload) => this.apiResponseService.launchApiError(payload.error))
    ), { dispatch: false }
  );

  deletePcElement$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPcElementsActions.deletePcElement),
      switchMap(payload => this.pcElementService.deletePcElement(payload.pcElementId).pipe(
        map(pcElement => fromPcElementsActions.deletePcElementSuccess({ pcElement })),
        catchError((error: HttpErrorResponse) => of(fromPcElementsActions.deletePcElementFailure({ error: error.error })))
      ))
    )
  );

  deletePcElementSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPcElementsActions.deletePcElementSuccess),
      tap(payload => {
        this.apiResponseService.launchApiSuccess(
          'Deletion successful',
          `PC element '${payload.pcElement.brand} ${payload.pcElement.model}' deleted successfully`
        )
      })
    ), { dispatch: false }
  );

  deletePcElementFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPcElementsActions.deletePcElementFailure),
      tap((payload) => this.apiResponseService.launchApiError(payload.error))
    ), { dispatch: false }
  );

}
