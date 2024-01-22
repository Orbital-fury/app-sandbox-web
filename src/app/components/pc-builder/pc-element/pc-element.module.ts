import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { PcElementComponent } from './pc-element.component';



@NgModule({
  declarations: [PcElementComponent],
  imports: [SharedModule]
})
export class PcElementModule { }
