import { PcElement } from "src/typing-pc-builder";

export interface PcElementsState {
    loadingSinglePcElement: boolean;
    singlePcElement: PcElement | undefined;
    loadingPcElements: boolean;
    pcElements: PcElement[];
    pcBuildElements: PcElement[];
    error: any;
};

export const pcElementsState: PcElementsState = {
    loadingSinglePcElement: false,
    singlePcElement: undefined,
    loadingPcElements: false,
    pcElements: [],
    pcBuildElements: [],
    error: ''
};
