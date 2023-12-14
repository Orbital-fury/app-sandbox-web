import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../../shared/shared.module';
import { CustomerModule } from './customer/customer.module';
import { ParallaxComponent } from './parallax/parallax.component';

@NgModule({
  declarations: [DashboardComponent, ParallaxComponent],
  imports: [SharedModule, CustomerModule],
})
export class TestModule {}
