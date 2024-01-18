import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { ElementTypeInfo, PcElement } from 'src/typing-pc-builder';



// State in component-store on purpose to have red flag if @ngrx/store is needed
export interface PcBuilderState {
  pcBuildElements: PcElement[];
  elementTypeChoices: ElementTypeInfo[];
};

const initialState: PcBuilderState = {
  pcBuildElements: [],
  elementTypeChoices: [
    { name: "CPU", code: "CPU", pcElements: [] },
    { name: "Case", code: "CASE", pcElements: [] },
    { name: "GPU", code: "GPU", pcElements: [] },
    { name: "Motherboard", code: "MOBO", pcElements: [] },
    { name: "RAM", code: "RAM", pcElements: [] },
    { name: "Power supply", code: "POWER", pcElements: [] },
    { name: "Storage", code: "STORAGE", pcElements: [] },
    { name: "Cooling system", code: "COOLING", pcElements: [] }
  ]
};

@Injectable()
export class PcBuilderStore extends ComponentStore<PcBuilderState> {

  constructor() {
    super(initialState);
  }

  // selector can be written as : readonly choosenPcElement$ = this.select(({choosenPcElement}) => choosenPcElement);
  readonly selectPcBuildElements$ = this.select(state => state.pcBuildElements);
  readonly selectElementTypeChoices$ = this.select(state => state.elementTypeChoices);

  readonly addPcElementToBuild = this.updater((state, pcElement: PcElement) => {
    return {
      ...state,
      pcBuildElements: [...state.pcBuildElements, pcElement]
    }
  });

  readonly removePcElementFromBuild = this.updater((state, pcElement: PcElement) => {
    const index = state.pcBuildElements.findIndex(pcBuildElement => pcBuildElement === pcElement);
    if (index !== -1) {
      state.pcBuildElements.splice(index, 1)
    }
    return {
      ...state,
      pcBuildElements: [...state.pcBuildElements]
    }
  });

}
