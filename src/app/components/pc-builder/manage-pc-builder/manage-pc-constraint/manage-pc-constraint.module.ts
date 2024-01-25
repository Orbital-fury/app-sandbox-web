import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ManagePcConstraintComponent } from './manage-pc-constraint.component';
import { UpdatePcConstraintComponent } from './update-pc-constraint/update-pc-constraint.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ManagePcConstraintComponent, UpdatePcConstraintComponent],
  imports: [SharedModule, ReactiveFormsModule]
})
export class ManagePcConstraintModule { }
