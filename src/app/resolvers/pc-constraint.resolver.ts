import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, first, firstValueFrom } from 'rxjs';
import { loadSinglePcConstraint } from '../store/pc-builder/pc-constraints/pc-constraints.actions';
import { selectSinglePcConstraint } from '../store/pc-builder/pc-constraints/pc-constraints.selectors';
import { PcConstraintsState } from '../store/pc-builder/pc-constraints/pc-constraints.state';
import { ResolverWrapper } from './resolver-wrapper';

export const pcConstraintResolver: ResolveFn<ResolverWrapper> = (route, state) => {
    const store = inject(Store<PcConstraintsState>);
    store.dispatch(loadSinglePcConstraint({ pcConstraintId: parseInt(route.paramMap.get('constraintId')!) }));
    return firstValueFrom(store.select(selectSinglePcConstraint)
        .pipe(filter(data => data !== undefined), first()))
        .then(pcConstraint => ({ breadcrumb: pcConstraint!.name, object: pcConstraint }));
};
