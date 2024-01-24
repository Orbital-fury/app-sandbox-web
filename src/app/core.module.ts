import { NgModule } from '@angular/core';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { SharedModule } from './shared/shared.module';
import { BreadcrumbComponent } from './shared/components/breadcrumb/breadcrumb.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, BreadcrumbComponent],
  imports: [SharedModule],
  exports: [HeaderComponent, FooterComponent, BreadcrumbComponent],
})
export class CoreModule {}
