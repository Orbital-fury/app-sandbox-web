import { NgModule } from '@angular/core';
import { PCBuilderComponent } from './pc-builder.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ElementTypeChoiceComponent } from './element-type-choice/element-type-choice.component';

@NgModule({
  declarations: [PCBuilderComponent, ElementTypeChoiceComponent],
  imports: [SharedModule]
})
export class PCBuilderModule { }
