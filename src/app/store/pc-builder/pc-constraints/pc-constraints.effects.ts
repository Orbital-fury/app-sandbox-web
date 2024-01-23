import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { PcConstraintService } from 'src/app/services/pc-builder/pc-constraint.service';
import * as fromPcConstraintsActions from './pc-constraints.actions';

@Injectable()
export class PcConstraintsEffects {

  constructor(private actions$: Actions, private pcConstraintService: PcConstraintService) { }

  loadPcElements$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPcConstraintsActions.loadPcConstraints),
      switchMap(() => this.pcConstraintService.getPcConstraints().pipe(
        map(pcConstraints => fromPcConstraintsActions.loadPcConstraintsSuccess({ pcConstraints })),
        catchError(error => of(fromPcConstraintsActions.loadPcConstraintsFailure({ error })))
      ))
    )
  );

  loadPcElementsSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPcConstraintsActions.loadPcConstraintsSuccess),
      tap(() => console.log("loadPcConstraintsSuccess"))
    ), { dispatch: false }
  );

  loadPcElementsFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPcConstraintsActions.loadPcConstraintsFailure),
      tap(() => console.log("loadPcConstraintsFailure"))
    ), { dispatch: false }
  );

}
