import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { PcBuilderStore } from '../../store/component-store/pc-builder.store';
import { ElementChoiceComponent } from './element-choice/element-choice.component';
import { ElementTypeChoiceComponent } from './element-type-choice/element-type-choice.component';
import { ManagePcBuilderModule } from './manage-pc-builder/manage-pc-builder.module';
import { PcBuilderComponent } from './pc-builder.component';

@NgModule({
  declarations: [PcBuilderComponent, ElementTypeChoiceComponent, ElementChoiceComponent],
  imports: [SharedModule, ManagePcBuilderModule],
  providers: [PcBuilderStore]
})
export class PcBuilderModule { }
