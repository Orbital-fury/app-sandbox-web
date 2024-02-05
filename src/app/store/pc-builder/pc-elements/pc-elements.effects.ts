import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { PcElementService } from 'src/app/services/pc-builder/pc-element.service';
import { ApiResponseService } from 'src/app/shared/services/api-response.service';
import * as fromPcElementsActions from './pc-elements.actions';
import { CustomToastrService } from 'src/app/shared/components/toast/custom-toastr.service';

@Injectable()
export class PcElementsEffects {

  constructor(
    private actions$: Actions,
    private pcElementService: PcElementService,
    private readonly apiResponseService: ApiResponseService
  ) { }

  loadPcElements$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPcElementsActions.loadPcElements),
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

}
