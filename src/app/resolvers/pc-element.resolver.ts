import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, first, firstValueFrom } from 'rxjs';
import { loadSinglePcElement } from '../store/pc-builder/pc-elements/pc-elements.actions';
import { selectSinglePcElement } from '../store/pc-builder/pc-elements/pc-elements.selectors';
import { PcElementsState } from '../store/pc-builder/pc-elements/pc-elements.state';
import { ResolverWrapper } from './resolver-wrapper';

export const pcElementResolver: ResolveFn<ResolverWrapper> = (route, state) => {
  const store = inject(Store<PcElementsState>);
  store.dispatch(loadSinglePcElement({ pcElementId: parseInt(route.paramMap.get('elementId')!) }));
  return firstValueFrom(store.select(selectSinglePcElement)
    .pipe(filter(data => data !== undefined), first()))
    .then(pcElement => ({ breadcrumb: `${pcElement!.brand} ${pcElement!.model}`, object: pcElement }));
};
