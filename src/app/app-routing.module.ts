import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MachineCalibrationComponent } from './components/mmm/machine-calibration/machine-calibration.component';
import { MaintenanceComponent } from './components/mmm/maintenance/maintenance.component';
import { MachineComponent } from './components/mmm/manage-machine/machine/machine.component';
import { ManageMachineComponent } from './components/mmm/manage-machine/manage-machine.component';
import { UpdateMachineComponent } from './components/mmm/manage-machine/update-machine/update-machine.component';
import { MmmHomeComponent } from './components/mmm/mmm-home/mmm-home.component';
import { MmmComponent } from './components/mmm/mmm.component';
import { PCBuilderComponent } from './components/pc-builder/pc-builder.component';
import { PcElementComponent } from './components/pc-builder/manage-pc-element/pc-element/pc-element.component';
import { CustomerComponent } from './components/test/customer/customer.component';
import { DashboardComponent } from './components/test/dashboard/dashboard.component';
import { ParallaxComponent } from './components/test/parallax/parallax.component';
import { ManagePcComponent } from './components/pc-builder/manage-pc-element/manage-pc.component';
import { UpdatePcElementComponent } from './components/pc-builder/manage-pc-element/update-pc-element/update-pc-element.component';
import { UpdatePcElementConstraintComponent } from './components/pc-builder/manage-pc-element/update-pc-element-constraint/update-pc-element-constraint.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'test/parallax', component: ParallaxComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'customer/:customerId', component: CustomerComponent },
  {
    path: 'pc-builder', children: [
      { path: '', component: PCBuilderComponent },
      { path: 'pc-elements/:elementId', component: PcElementComponent },
      {
        path: 'manage-pc-element', children: [
          { path: '', component: ManagePcComponent },
          { path: 'create', component: UpdatePcElementComponent },
          { path: 'create-constraint', component: UpdatePcElementConstraintComponent },
        ]
      },
    ]
  },
  {
    path: 'mmm',
    component: MmmComponent,
    children: [
      { path: '', component: MmmHomeComponent, outlet: 'mmm' },
      {
        path: 'manage-machine',
        children: [
          { path: '', component: ManageMachineComponent },
          { path: 'create', component: UpdateMachineComponent },
          { path: ':machineId', component: MachineComponent },
        ],
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
export class AppRoutingModule { }
