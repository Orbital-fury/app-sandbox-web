import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { PcElement } from 'src/typing-pc-builder';
import { PcElementService } from '../services/pc-builder/pc-element.service';
import { map } from 'rxjs';

export const pcElementBreadcrumbResolver: ResolveFn<string> = (route, state) => {
  return inject(PcElementService).getPcElement(parseInt(route.paramMap.get('elementId')!)).pipe(
    map((pcElement: PcElement) => `${pcElement.brand} ${pcElement.model}`)
  );
};
