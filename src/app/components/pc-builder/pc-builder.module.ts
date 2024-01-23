import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { PcBuilderStore } from '../../store/component-store/pc-builder.store';
import { CurrencyPipeComponent } from './currency-pipe/currency-pipe.component';
import { ElementChoiceComponent } from './element-choice/element-choice.component';
import { ElementTypeChoiceComponent } from './element-type-choice/element-type-choice.component';
import { PcBuilderComponent } from './pc-builder.component';
import { ManagePcBuilderModule } from './manage-pc-builder/manage-pc-builder.module';

@NgModule({
  declarations: [PcBuilderComponent, ElementTypeChoiceComponent, ElementChoiceComponent, CurrencyPipeComponent],
  imports: [SharedModule, ManagePcBuilderModule],
  providers: [PcBuilderStore]
})
export class PcBuilderModule { }
