import { ApiError } from "src/app/services/api-response.service";
import { PcElementType } from "src/typing-pc-builder";

export interface PcElementTypesState {
    loadingPcElementTypes: boolean;
    pcElementTypes: PcElementType[];
    error: ApiError | undefined;
};

export const pcElementTypesState: PcElementTypesState = {
    loadingPcElementTypes: false,
    pcElementTypes: [],
    error: undefined
};
