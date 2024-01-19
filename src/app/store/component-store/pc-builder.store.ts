import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { PcElement } from 'src/typing-pc-builder';



// State in component-store on purpose to have red flag if @ngrx/store is needed
export interface PcBuilderState {
  pcBuildElements: PcElement[];
};

const initialState: PcBuilderState = {
  pcBuildElements: []
};

@Injectable()
export class PcBuilderStore extends ComponentStore<PcBuilderState> {

  constructor() {
    super(initialState);
  }

  // selector can be written as : readonly choosenPcElement$ = this.select(({choosenPcElement}) => choosenPcElement);
  readonly selectPcBuildElements$ = this.select(state => state.pcBuildElements);

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
