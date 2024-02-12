import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { ApiResponseService } from 'src/app/services/api-response.service';
import { PcElementTypeService } from 'src/app/services/pc-builder/pc-element-type.service';
import * as fromPcElementTypesActions from './pc-element-types.actions';

@Injectable()
export class PcElementTypesEffects {

    constructor(
        private actions$: Actions,
        private pcElementTypeService: PcElementTypeService,
        private router: Router,
        private readonly apiResponseService: ApiResponseService
    ) { }

    loadPcElementTypes$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromPcElementTypesActions.loadPcElementTypes),
            switchMap(() => this.pcElementTypeService.getPcElementTypes().pipe(
                map(pcElementTypes => fromPcElementTypesActions.loadPcElementTypesSuccess({ pcElementTypes })),
                catchError((error: HttpErrorResponse) => of(fromPcElementTypesActions.loadPcElementTypesFailure({ error: error.error })))
            ))
        )
    );

    loadPcElementTypesFailure$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromPcElementTypesActions.loadPcElementTypesFailure),
            tap((payload) => this.apiResponseService.launchApiError(payload.error))
        ), { dispatch: false }
    );

}
