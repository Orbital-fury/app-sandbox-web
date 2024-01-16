import { NgModule } from '@angular/core';
import { PCBuilderComponent } from './pc-builder.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ElementTypeChoiceComponent } from './element-type-choice/element-type-choice.component';
import { ElementChoiceComponent } from './element-choice/element-choice.component';
import { CurrencyPipeComponent } from './currency-pipe/currency-pipe.component';
import { PcBuilderStore } from '../../store/component-store/pc-builder.store';

@NgModule({
  declarations: [PCBuilderComponent, ElementTypeChoiceComponent, ElementChoiceComponent, CurrencyPipeComponent],
  imports: [SharedModule],
  providers: [PcBuilderStore]
})
export class PCBuilderModule { }
