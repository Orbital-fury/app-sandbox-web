import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ManagePcConstraintComponent } from './manage-pc-constraint.component';
import { ModalDeletePcConstraintComponent } from './modal-delete-pc-constraint/modal-delete-pc-constraint.component';
import { UpdatePcConstraintComponent } from './update-pc-constraint/update-pc-constraint.component';

@NgModule({
  declarations: [ManagePcConstraintComponent, UpdatePcConstraintComponent, ModalDeletePcConstraintComponent],
  imports: [SharedModule, ReactiveFormsModule]
})
export class ManagePcConstraintModule { }
