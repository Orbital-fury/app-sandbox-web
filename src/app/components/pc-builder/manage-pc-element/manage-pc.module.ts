import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ManagePcComponent } from './manage-pc.component';
import { UpdatePcElementConstraintComponent } from './update-pc-element-constraint/update-pc-element-constraint.component';
import { UpdatePcElementComponent } from './update-pc-element/update-pc-element.component';
import { PcElementComponent } from './pc-element/pc-element.component';

@NgModule({
  declarations: [PcElementComponent, ManagePcComponent, UpdatePcElementComponent, UpdatePcElementConstraintComponent],
  imports: [SharedModule]
})
export class ManagePcModule { }
