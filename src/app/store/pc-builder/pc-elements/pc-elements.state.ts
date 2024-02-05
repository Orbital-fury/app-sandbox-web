import { ApiError } from "src/app/shared/services/api-response.service";
import { PcElement, PcElementType } from "src/typing-pc-builder";

export interface PcElementsState {
    selectedPcElementType: PcElementType;
    loadingSinglePcElement: boolean;
    singlePcElement: PcElement | undefined;
    loadingPcElements: boolean;
    pcElements: PcElement[];
    pcBuildElements: PcElement[];
    error: ApiError | undefined;
};

export const pcElementsState: PcElementsState = {
    selectedPcElementType: 'CPU',
    loadingSinglePcElement: false,
    singlePcElement: undefined,
    loadingPcElements: false,
    pcElements: [],
    pcBuildElements: [],
    error: undefined
};
