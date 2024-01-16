import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { ElementTypeInfo, PcElement } from 'src/typing-pc-builder';

// State in component-store on purpose to have red flag if @ngrx/store is needed
export interface PcBuilderState {
  pcBuildElements: PcElement[];
  pcElements: PcElement[];
  lastSelectedPcElement: PcElement | undefined;
  elementTypeChoices: ElementTypeInfo[];
  selectedElementTypeInfo: ElementTypeInfo;
};

const initialState: PcBuilderState = {
  pcBuildElements: [],
  pcElements: [],
  lastSelectedPcElement: undefined,
  elementTypeChoices: [
    { name: "CPU", code: "CPU", isPcElementSelected: false },
    { name: "Case", code: "CASE", isPcElementSelected: false },
    { name: "GPU", code: "GPU", isPcElementSelected: false },
    { name: "Motherboard", code: "MOBO", isPcElementSelected: false },
    { name: "RAM", code: "RAM", isPcElementSelected: false },
    { name: "Power supply", code: "POWER", isPcElementSelected: false },
    { name: "Storage", code: "STORAGE", isPcElementSelected: false },
    { name: "Cooling system", code: "COOLING", isPcElementSelected: false }
  ],
  selectedElementTypeInfo: { name: "CPU", code: "CPU", isPcElementSelected: false }
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
  readonly selectLastSelectedPcElement$ = this.select(state => state.lastSelectedPcElement);
  readonly selectElementTypeChoices$ = this.select(state => state.elementTypeChoices);

  readonly addPcElementToBuild = this.updater((state, pcElement: PcElement) => {
    const newPcBuildElements: PcElement[] = [...state.pcBuildElements, pcElement];
    const newElementTypeChoices: ElementTypeInfo[] = [...state.elementTypeChoices];
    return {
      ...state,
      pcBuildElements: newPcBuildElements
    }
  });

}
