import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ManagePcBuilderComponent } from './manage-pc-builder.component';
import { ManagePcConstraintModule } from './manage-pc-constraint/manage-pc-constraint.module';
import { ManagePcElementModule } from './manage-pc-element/manage-pc-element.module';

@NgModule({
  declarations: [ManagePcBuilderComponent],
  imports: [SharedModule, ManagePcElementModule, ManagePcConstraintModule]
})
export class ManagePcBuilderModule { }
