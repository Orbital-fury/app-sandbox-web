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
import { ManagePcBuilderComponent } from './components/pc-builder/manage-pc-builder/manage-pc-builder.component';
import { ManagePcConstraintComponent } from './components/pc-builder/manage-pc-builder/manage-pc-constraint/manage-pc-constraint.component';
import { UpdatePcConstraintComponent } from './components/pc-builder/manage-pc-builder/manage-pc-constraint/update-pc-constraint/update-pc-constraint.component';
import { ManagePcElementComponent } from './components/pc-builder/manage-pc-builder/manage-pc-element/manage-pc-element.component';
import { PcElementComponent } from './components/pc-builder/manage-pc-builder/manage-pc-element/pc-element/pc-element.component';
import { UpdatePcElementComponent } from './components/pc-builder/manage-pc-builder/manage-pc-element/update-pc-element/update-pc-element.component';
import { PcBuilderComponent } from './components/pc-builder/pc-builder.component';
import { CustomerComponent } from './components/test/customer/customer.component';
import { DashboardComponent } from './components/test/dashboard/dashboard.component';
import { ParallaxComponent } from './components/test/parallax/parallax.component';
import { machineResolver } from './resolvers/machine.resolver';
import { pcElementResolver } from './resolvers/pc-element.resolver';
import { pcConstraintResolver } from './resolvers/pc-constraint.resolver';

const routes: Routes = [
  {
    path: '', data: { breadcrumb: 'Home' }, children: [
      { path: '', component: HomeComponent },
      {
        path: 'test', children: [
          { path: 'parallax', data: { breadcrumb: 'Parallax' }, component: ParallaxComponent }
        ]
      },
      { path: 'dashboard', data: { breadcrumb: 'Dashboard' }, component: DashboardComponent },
      { path: 'customer/:customerId', data: { breadcrumb: 'Customer - ' }, component: CustomerComponent },
      {
        path: 'pc-builder', data: { breadcrumb: 'PC Builder' }, children: [
          { path: '', component: PcBuilderComponent },
          {
            path: 'pc-elements/:elementId', resolve: { pcElement: pcElementResolver },
            data: { breadcrumb: '@pcElement.breadcrumb' }, component: PcElementComponent
          },
          {
            path: 'manage', data: { breadcrumb: 'Admin manager' }, children: [
              { path: '', component: ManagePcBuilderComponent },
              {
                path: 'pc-elements', data: { breadcrumb: 'PC elements' }, children: [
                  { path: '', component: ManagePcElementComponent },
                  { path: 'create', component: UpdatePcElementComponent, data: { breadcrumb: 'Create' } },
                  {
                    path: ':elementId', component: UpdatePcElementComponent,
                    resolve: { pcElement: pcElementResolver },
                    data: { breadcrumb: '@pcElement.breadcrumb' }
                  },
                ]
              },
              {
                path: 'pc-constraints', data: { breadcrumb: 'PC constraints' }, children: [
                  { path: '', component: ManagePcConstraintComponent },
                  { path: 'create', component: UpdatePcConstraintComponent, data: { breadcrumb: 'Create' } },
                  {
                    path: ':constraintId', component: UpdatePcConstraintComponent,
                    resolve: { pcConstraint: pcConstraintResolver },
                    data: { breadcrumb: '@pcConstraint.breadcrumb' }
                  },
                ]
              },
            ]
          },
        ]
      },
      {
        path: 'mmm', data: { breadcrumb: 'Mmm' }, component: MmmComponent,
        children: [
          { path: '', data: { breadcrumb: 'Overview' }, component: MmmHomeComponent, outlet: 'mmm' },
          {
            path: 'manage-machine', data: { breadcrumb: 'Manage machines' },
            children: [
              { path: '', component: ManageMachineComponent },
              { path: 'create', data: { breadcrumb: 'Create' }, component: UpdateMachineComponent },
              {
                path: ':machineId', resolve: { machine: machineResolver },
                data: { breadcrumb: '@machine' }, component: MachineComponent
              },
            ],
            outlet: 'mmm',
          },
          {
            path: 'machine-calibration',
            data: { breadcrumb: 'Machine calibration' },
            component: MachineCalibrationComponent,
            outlet: 'mmm',
          },
          {
            path: 'maintenance',
            data: { breadcrumb: 'Maintenance' },
            component: MaintenanceComponent,
            outlet: 'mmm',
          }
        ],
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
