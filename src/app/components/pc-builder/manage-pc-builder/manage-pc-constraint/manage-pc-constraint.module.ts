import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ManagePcConstraintComponent } from './manage-pc-constraint.component';
import { UpdatePcConstraintComponent } from './update-pc-constraint/update-pc-constraint.component';

@NgModule({
  declarations: [ManagePcConstraintComponent, UpdatePcConstraintComponent],
  imports: [SharedModule]
})
export class ManagePcConstraintModule { }
