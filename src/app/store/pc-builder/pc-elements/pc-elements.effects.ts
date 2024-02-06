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
