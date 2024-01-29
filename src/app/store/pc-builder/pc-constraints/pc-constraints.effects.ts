import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { PcConstraintService } from 'src/app/services/pc-builder/pc-constraint.service';
import * as fromPcConstraintsActions from './pc-constraints.actions';
import { Router } from '@angular/router';

@Injectable()
export class PcConstraintsEffects {

  constructor(private actions$: Actions, private pcConstraintService: PcConstraintService, private router: Router) { }

  loadPcConstraints$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPcConstraintsActions.loadPcConstraints),
      switchMap(() => this.pcConstraintService.getPcConstraints().pipe(
        map(pcConstraints => fromPcConstraintsActions.loadPcConstraintsSuccess({ pcConstraints })),
        catchError(error => of(fromPcConstraintsActions.loadPcConstraintsFailure({ error })))
      ))
    )
  );

  loadPcConstraintsSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPcConstraintsActions.loadPcConstraintsSuccess),
      tap(() => console.log("loadPcConstraintsSuccess"))
    ), { dispatch: false }
  );

  loadPcConstraintsFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPcConstraintsActions.loadPcConstraintsFailure),
      tap(() => console.log("loadPcConstraintsFailure"))
    ), { dispatch: false }
  );

  addPcConstraints$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPcConstraintsActions.createPcConstraint),
      switchMap((payload) => this.pcConstraintService.createPcConstraint(payload.newPcConstraint).pipe(
        map(createdPcConstraint => fromPcConstraintsActions.createPcConstraintSuccess({ newPcConstraintId: createdPcConstraint.id })),
        catchError(error => of(fromPcConstraintsActions.createPcConstraintFailure({ error })))
      ))
    )
  );

  addPcConstraintsSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPcConstraintsActions.createPcConstraintSuccess),
      tap(() => this.router.navigate(['/pc-builder/manage-pc-builder/pc-constraints']))
    ), { dispatch: false }
  );

  addPcConstraintsFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPcConstraintsActions.createPcConstraintFailure),
      tap(() => console.log("createPcConstraintFailure"))
    ), { dispatch: false }
  );

}
