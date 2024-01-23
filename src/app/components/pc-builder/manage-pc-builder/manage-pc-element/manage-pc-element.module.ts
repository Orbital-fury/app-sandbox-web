import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ManagePcElementComponent } from './manage-pc-element.component';
import { PcElementComponent } from './pc-element/pc-element.component';
import { UpdatePcElementComponent } from './update-pc-element/update-pc-element.component';

@NgModule({
  declarations: [ManagePcElementComponent, PcElementComponent, UpdatePcElementComponent],
  imports: [SharedModule]
})
export class ManagePcElementModule { }
