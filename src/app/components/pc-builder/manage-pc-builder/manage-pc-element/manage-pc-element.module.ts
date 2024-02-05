import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ManagePcElementComponent } from './manage-pc-element.component';
import { ModalDeletePcElementComponent } from './modal-delete-pc-element/modal-delete-pc-element.component';
import { PcElementComponent } from './pc-element/pc-element.component';
import { UpdatePcElementComponent } from './update-pc-element/update-pc-element.component';

@NgModule({
  declarations: [ManagePcElementComponent, PcElementComponent, UpdatePcElementComponent, ModalDeletePcElementComponent],
  imports: [SharedModule, FormsModule]
})
export class ManagePcElementModule { }
