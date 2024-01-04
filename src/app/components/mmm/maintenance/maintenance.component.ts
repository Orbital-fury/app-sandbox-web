import { Component, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Machine } from '../../../../typing-mmm';
import { MmmMachineService } from '../../../services/mmm/mmm-machine.service';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss'],
})
export class MaintenanceComponent implements OnInit {
  machines: Machine[] = [];

  rows: any[] = [];
  temp: any[] = [];

  ColumnMode = ColumnMode;

  constructor(private machineService: MmmMachineService) {
  }

  ngOnInit(): void {
    let rowsToCreate: any[] = [];
    this.machineService.getMachines().subscribe((data) => {
      this.machines = data;
      this.machines.forEach((machine) => {
        rowsToCreate.push({
          id: machine.id,
          name: machine.model.name,
          sn: machine.sn,
          lastMaintenance: this.lastMaintenanceDisplay(machine.lastMaintenanceDate),
          needMaintenance: this.needMaintenanceDisplay(machine.needMaintenance),
          brand: machine.model.brand.name,
          contact: machine.model.brand.website,
          factory: machine.factory,
          model: machine.model,
          lastMaintenanceAgo: this.lastMaintenanceAgo(machine)
        })
      })
      this.rows = rowsToCreate
      this.temp = rowsToCreate
    });
  }

  lastMaintenanceDisplay(lastmaintenanceDate: Date | null): string {
    return lastmaintenanceDate ? new Date(lastmaintenanceDate).toISOString().split('T')[0] : '-'
  }

  needMaintenanceDisplay(needMaintenance: boolean): string {
    return needMaintenance ? 'Yes' : 'No'
  }

  getRowClass(row: any): any {
    return {
      'bg-danger': row.needMaintenance === 'Yes',
      'machine-row': true
    };
  }

  sortLastMaintenance(propA: string, propB: string): number {
    if (propA === '-') {
      return 1
    }
    if (propB === '-') {
      return -1
    }
    let dateA = new Date(propA)
    let dateB = new Date(propB)
    return dateA.getTime() - dateB.getTime();
  }

  filterBySn(event: any) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter((machine) => {
      return machine.sn.toLowerCase().indexOf(val) !== -1 || !val
    });

    // update the rows
    this.rows = temp;

    // Whenever the filter changes, always go back to the first page
    //this.table.offset = 0;
  }

  filterByNeedMaintenance(event: any) {
    let temp = this.temp
    if (event.target.checked) {
      // filter our data
      temp = this.temp.filter((machine) => {
        return machine.needMaintenance === 'Yes'
      });
    }
    // update the rows
    this.rows = temp;
  }

  getLastMaintClass({ row, column, value }: any): any {
    return {
      'lastMaint6Months': row.lastMaintenanceAgo.isCritic
    };
  }

  lastMaintenanceLimit(date: Date | null): number {
    if (date) {
      const lastMaint = new Date(date).getTime()
      const diffTime = Math.abs(new Date().getTime() - lastMaint);
      return Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365.25));
    } else {
      return 0
    }
  }

  lastMaintenanceAgo(machine: Machine) {
    const lastMaintenanceLimit = this.lastMaintenanceLimit(machine.lastMaintenanceDate)
    return { 
      isCritic: lastMaintenanceLimit > 4 && machine.needMaintenance, 
      value: lastMaintenanceLimit
    }
  }

}
