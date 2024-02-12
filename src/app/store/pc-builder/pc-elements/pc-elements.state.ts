import { ApiError } from "src/app/services/api-response.service";
import { PcElement, PcElementTypeEnum } from "src/typing-pc-builder";

export interface PcElementsState {
    selectedPcElementType: PcElementTypeEnum;
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
