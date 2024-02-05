import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { map } from 'rxjs';
import { Machine } from 'src/typing-mmm';
import { MmmMachineService } from '../services/mmm/mmm-machine.service';

export const machineResolver: ResolveFn<string> = (route, state) => {
  return inject(MmmMachineService).getMachine(parseInt(route.paramMap.get('machineId')!)).pipe(
    map((machine: Machine) => `${machine.model.brand.name} ${machine.model.name}`)
  );
};
