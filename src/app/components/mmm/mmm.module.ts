import { NgModule } from '@angular/core';
import { MmmComponent } from './mmm.component';
import { SharedModule } from '../../shared/shared.module';
import { MmmMenuComponent } from './mmm-menu/mmm-menu.component';
import { ManageMachineComponent } from './manage-machine/manage-machine.component';
import { MachineCalibrationComponent } from './machine-calibration/machine-calibration.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { MmmHomeComponent } from './mmm-home/mmm-home.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { UpdateMachineComponent } from './manage-machine/update-machine/update-machine.component';
import { MachineComponent } from './manage-machine/machine/machine.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { MachineMetricComponent } from './manage-machine/machine/machine-metric/machine-metric.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  declarations: [
    MmmComponent,
    MmmMenuComponent,
    ManageMachineComponent,
    MachineCalibrationComponent,
    MaintenanceComponent,
    MmmHomeComponent,
    UpdateMachineComponent,
    MachineComponent,
    MachineMetricComponent
  ],
  imports: [SharedModule, AutocompleteLibModule, HighchartsChartModule, ReactiveFormsModule, NgxDatatableModule],
  exports: [SharedModule, HighchartsChartModule]
})
export class MmmModule {}
