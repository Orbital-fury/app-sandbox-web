import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomerComponent } from './customer.component';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [CustomerComponent],
  imports: [SharedModule, NgbAccordionModule]
})
export class CustomerModule {}
