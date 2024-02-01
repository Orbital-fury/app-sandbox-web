import { NgModule } from '@angular/core';
import { BreadcrumbComponent } from './shared/components/breadcrumb/breadcrumb.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, BreadcrumbComponent],
  imports: [SharedModule],
  exports: [HeaderComponent, FooterComponent, BreadcrumbComponent],
})
export class CoreModule { }
