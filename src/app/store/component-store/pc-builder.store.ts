import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { ElementTypeInfo, PcElement } from 'src/typing-pc-builder';

const elementTypeChoices: ElementTypeInfo[] = [
  { name: "CPU", code: "CPU", isPcElementSelected: false },
  { name: "Case", code: "CASE", isPcElementSelected: false },
  { name: "GPU", code: "GPU", isPcElementSelected: false },
  { name: "Motherboard", code: "MOBO", isPcElementSelected: false },
  { name: "RAM", code: "RAM", isPcElementSelected: false },
  { name: "Power supply", code: "POWER", isPcElementSelected: false },
  { name: "Storage", code: "STORAGE", isPcElementSelected: false },
  { name: "Cooling system", code: "COOLING", isPcElementSelected: false }
];

// State in component-store on purpose to have red flag if @ngrx/store is needed
export interface PcBuilderState {
  pcBuildElements: PcElement[];
  pcElements: PcElement[];
  elementTypeChoices: ElementTypeInfo[];
  selectedElementTypeInfo: ElementTypeInfo;
};

const initialState: PcBuilderState = {
  pcBuildElements: [],
  pcElements: [],
  elementTypeChoices: elementTypeChoices,
  selectedElementTypeInfo: elementTypeChoices[0]
};

@Injectable()
export class PcBuilderStore extends ComponentStore<PcBuilderState> {

  constructor() {
    super(initialState);
  }

  // selector can be written as : readonly choosenPcElement$ = this.select(({choosenPcElement}) => choosenPcElement);
  readonly selectPcBuildElements$ = this.select(state => state.pcBuildElements);
  readonly selectPcElements$ = this.select(state => state.pcElements);
  readonly selectSelectedElementTypeInfo$ = this.select(state => state.selectedElementTypeInfo);
  readonly selectElementTypeChoices$ = this.select(state => state.elementTypeChoices);

  readonly addPcElementToBuild = this.updater((state, pcElement: PcElement) => {
    state.elementTypeChoices.find(elementTypeChoice => elementTypeChoice.code === pcElement.type)!.isPcElementSelected = true;
    return {
      ...state,
      pcBuildElements: [...state.pcBuildElements, pcElement],
      elementTypeChoices: [...state.elementTypeChoices]
    }
  });

  readonly removePcElementFromBuild = this.updater((state, pcElement: PcElement) => {
    state.elementTypeChoices.find(elementTypeChoice => elementTypeChoice.code === pcElement.type)!.isPcElementSelected = false;
    const index = state.pcBuildElements.findIndex(pcBuildElement => pcBuildElement === pcElement);
    if (index !== -1) {
      state.pcBuildElements.splice(index, 1)
    }
    return {
      ...state,
      pcBuildElements: [...state.pcBuildElements],
      elementTypeChoices: [...state.elementTypeChoices]
    }
  });

}
