import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { PcElementService } from 'src/app/services/pc-builder/pc-element.service';
import * as fromPcElementActions from './pc-elements.actions';

@Injectable()
export class PcElementsEffects {

  constructor(private actions$: Actions, private pcElementService: PcElementService) { }

  loadPcElements$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPcElementActions.loadPcElements),
      switchMap(() => this.pcElementService.getPcElements().pipe(
        map(pcElements => fromPcElementActions.loadPcElementsSuccess({ pcElements })),
        catchError(error => of(fromPcElementActions.loadPcElementsFailure({ error })))
      ))
    )
  );

  loadPcElementsSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPcElementActions.loadPcElementsSuccess),
      tap(() => console.log("loadPcElementsSuccess"))
    ), { dispatch: false }
  );

  loadPcElementsFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPcElementActions.loadPcElementsFailure),
      tap(() => console.log("loadPcElementsFailure"))
    ), { dispatch: false }
  );

  loadSinglePcElement$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPcElementActions.loadSinglePcElement),
      switchMap(payload => this.pcElementService.getPcElement(payload.pcElementId).pipe(
        map(pcElement => fromPcElementActions.loadSinglePcElementSuccess({ pcElement })),
        catchError(error => of(fromPcElementActions.loadSinglePcElementFailure({ error })))
      ))
    )
  );

  loadSinglePcElementSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPcElementActions.loadSinglePcElementSuccess),
      tap(() => console.log("loadSinglePcElementSuccess"))
    ), { dispatch: false }
  );

  loadSinglePcElementFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPcElementActions.loadSinglePcElementFailure),
      tap(() => console.log("loadSinglePcElementFailure"))
    ), { dispatch: false }
  );

}
