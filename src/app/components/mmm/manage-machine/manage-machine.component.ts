import { Component } from '@angular/core';
import { MmmMachineService } from '../../../services/mmm/mmm-machine.service';
import { MmmFactoryService } from '../../../services/mmm/mmm-factory.service';
import {
  FactoryEntity,
  MachineWithModelAndFactory,
} from '../../../../typing-mmm';

@Component({
  selector: 'app-manage-machine',
  templateUrl: './manage-machine.component.html',
  styleUrls: ['./manage-machine.component.scss'],
})
export class ManageMachineComponent {
  machinesAll: MachineWithModelAndFactory[] = [];
  machines: MachineWithModelAndFactory[] = [];
  orderBy: string = 'Name';
  sortByDesc: boolean = false;
  factories: FactoryEntity[] = [];
  factoryKeyword = 'name';

  constructor(
    private machineService: MmmMachineService,
    private factoryService: MmmFactoryService
  ) {}

  ngOnInit(): void {
    this.machineService.getMachinesWithModel().subscribe((data) => {
      this.machines = data;
      this.machinesAll = data;
      this.orderByFunc('Factory');
    });
    this.factoryService.getFactories().subscribe((data) => {
      this.factories = data;
    });
  }

  orderByFunc(orderBy: string): void {
    if (orderBy === 'Factory') {
      this.machines = this.machines.sort((f1, f2) => {
        let order = f1.factory.name.localeCompare(f2.factory.name);
        if (this.sortByDesc) {
          order = -order;
        }
        return order;
      });
    } else if (orderBy === 'Brand') {
      this.machines = this.machines.sort((f1, f2) => {
        let order = f1.model.brand.name.localeCompare(f2.model.brand.name);
        if (this.sortByDesc) {
          order = -order;
        }
        return order;
      });
    } else if (orderBy === 'Type') {
      this.machines = this.machines.sort((f1, f2) => {
        let order = f1.model.type.localeCompare(f2.model.type);
        if (this.sortByDesc) {
          order = -order;
        }
        return order;
      });
    } else if (orderBy === 'Maintenance') {
      this.machines = this.machines.sort((f1, f2) => {
        if (f1.needMaintenance && !f2.needMaintenance) {
          return this.sortByDesc ? -1 : 1;
        } else if (!f1.needMaintenance && f2.needMaintenance) {
          return this.sortByDesc ? 1 : -1;
        } else {
          return 0;
        }
      });
    }
    this.orderBy = orderBy;
  }

  reverseOrder(): void {
    this.machines.reverse();
    this.sortByDesc = !this.sortByDesc;
  }

  selectEvent(event: any): void {
    console.log('selectEvent', event.name);
    this.machines = this.machines.filter(
      (machine) => machine.factory.name === event.name
    );
  }
  onInputCleared(): void {
    this.machines = this.machinesAll;
    this.orderByFunc(this.orderBy);
  }
}
