import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/test/dashboard/dashboard.component';
import { CustomerComponent } from './components/test/customer/customer.component';
import { MmmComponent } from './components/mmm/mmm.component';
import { ManageMachineComponent } from './components/mmm/manage-machine/manage-machine.component';
import { MachineCalibrationComponent } from './components/mmm/machine-calibration/machine-calibration.component';
import { MaintenanceComponent } from './components/mmm/maintenance/maintenance.component';
import { MmmHomeComponent } from './components/mmm/mmm-home/mmm-home.component';
import { UpdateMachineComponent } from './components/mmm/manage-machine/update-machine/update-machine.component';
import { MachineComponent } from './components/mmm/manage-machine/machine/machine.component';
import { ParallaxComponent } from './components/test/parallax/parallax.component';
import { PCBuilderComponent } from './components/pc-builder/pc-builder.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'test/parallax', component: ParallaxComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'customer/:customerId', component: CustomerComponent },
  { path: 'pc-builder', component: PCBuilderComponent },
  {
    path: 'mmm',
    component: MmmComponent,
    children: [
      { path: '', component: MmmHomeComponent, outlet: 'mmm' },
      {
        path: 'manage-machine',
        component: ManageMachineComponent,
        outlet: 'mmm',
      },
      {
        path: 'manage-machine/create',
        component: UpdateMachineComponent,
        outlet: 'mmm',
      },
      {
        path: 'manage-machine/:machineId',
        component: MachineComponent,
        outlet: 'mmm',
      },
      {
        path: 'machine-calibration',
        component: MachineCalibrationComponent,
        outlet: 'mmm',
      },
      {
        path: 'maintenance',
        component: MaintenanceComponent,
        outlet: 'mmm',
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
