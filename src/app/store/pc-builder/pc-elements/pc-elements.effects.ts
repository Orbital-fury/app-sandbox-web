import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { PcElementService } from 'src/app/services/pc-builder/pc-element.service';
import * as fromPcElementsActions from './pc-elements.actions';

@Injectable()
export class PcElementsEffects {

  constructor(private actions$: Actions, private pcElementService: PcElementService) { }

  loadPcElements$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPcElementsActions.loadPcElements),
      switchMap(() => this.pcElementService.getPcElements().pipe(
        map(pcElements => fromPcElementsActions.loadPcElementsSuccess({ pcElements })),
        catchError(error => of(fromPcElementsActions.loadPcElementsFailure({ error })))
      ))
    )
  );

  loadPcElementsFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPcElementsActions.loadPcElementsFailure),
      tap(() => console.log("loadPcElementsFailure"))
    ), { dispatch: false }
  );

  loadSinglePcElement$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPcElementsActions.loadSinglePcElement),
      switchMap(payload => this.pcElementService.getPcElement(payload.pcElementId).pipe(
        map(pcElement => fromPcElementsActions.loadSinglePcElementSuccess({ pcElement })),
        catchError(error => of(fromPcElementsActions.loadSinglePcElementFailure({ error })))
      ))
    )
  );

  loadSinglePcElementFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPcElementsActions.loadSinglePcElementFailure),
      tap(() => console.log("loadSinglePcElementFailure"))
    ), { dispatch: false }
  );

}
