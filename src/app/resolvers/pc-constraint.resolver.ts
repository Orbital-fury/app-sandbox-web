import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { map } from 'rxjs';
import { PcConstraintWithoutValue } from 'src/typing-pc-builder';
import { PcConstraintService } from '../services/pc-builder/pc-constraint.service';

export const pcConstraintBreadcrumbResolver: ResolveFn<string> = (route, state) => {
    return inject(PcConstraintService).getPcConstraint(parseInt(route.paramMap.get('constraintId')!)).pipe(
        map((pcConstraint: PcConstraintWithoutValue) => pcConstraint.name)
    );
};
