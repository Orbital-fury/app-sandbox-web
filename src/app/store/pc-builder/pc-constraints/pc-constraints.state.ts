import { ApiError } from "src/app/shared/services/api-response.service";
import { PcConstraintWithoutValue, PcElementConstraintValues } from "src/typing-pc-builder";

export interface PcConstraintsState {
    loadingPcConstraints: boolean;
    pcConstraints: PcConstraintWithoutValue[];
    loadingSinglePcConstraint: boolean;
    singlePcConstraint: PcConstraintWithoutValue | undefined;
    loadingPcElementsConstraintValues: boolean;
    pcElementsConstraintValues: PcElementConstraintValues[];
    error: ApiError | undefined;
};

export const pcConstraintsState: PcConstraintsState = {
    loadingPcConstraints: false,
    pcConstraints: [],
    loadingSinglePcConstraint: false,
    singlePcConstraint: undefined,
    loadingPcElementsConstraintValues: false,
    pcElementsConstraintValues: [],
    error: undefined
};
