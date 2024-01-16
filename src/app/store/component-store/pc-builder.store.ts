import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { ElementTypeInfo, PcElement } from 'src/typing-pc-builder';

// State in component-store on purpose to have red flag if @ngrx/store is needed
export interface PcBuilderState {
  choosenPcElement: PcElement[];
  pcElements: PcElement[];
  selectedPcElementTypeInfo: ElementTypeInfo;
};

const initialState: PcBuilderState = {
  choosenPcElement: [],
  pcElements: [],
  selectedPcElementTypeInfo: {
    name: 'CPU',
    code: 'CPU',
    isPcElementSelected: false
  }
};

@Injectable()
export class PcBuilderStore extends ComponentStore<PcBuilderState> {

  constructor() {
    super(initialState);
  }

  // selector can be written as : readonly choosenPcElement$ = this.select(({choosenPcElement}) => choosenPcElement);
  readonly choosenPcElement$ = this.select(state => state.choosenPcElement);
  readonly pcElements$ = this.select(state => state.pcElements);
  readonly selectedPcElementTypeInfo$ = this.select(state => state.selectedPcElementTypeInfo);

  readonly loadChoosenPcElement = this.updater((state, choosenPcElement: PcElement[]) => ({
    ...state,
    choosenPcElement
  }));

}
