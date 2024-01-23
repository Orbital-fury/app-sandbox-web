import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { PcBuilderStore } from '../../store/component-store/pc-builder.store';
import { CurrencyPipeComponent } from './currency-pipe/currency-pipe.component';
import { ElementChoiceComponent } from './element-choice/element-choice.component';
import { ElementTypeChoiceComponent } from './element-type-choice/element-type-choice.component';
import { ManagePcModule } from './manage-pc-element/manage-pc.module';
import { PCBuilderComponent } from './pc-builder.component';

@NgModule({
  declarations: [PCBuilderComponent, ElementTypeChoiceComponent, ElementChoiceComponent, CurrencyPipeComponent],
  imports: [
    SharedModule,
    ManagePcModule
  ],
  providers: [PcBuilderStore]
})
export class PCBuilderModule { }
