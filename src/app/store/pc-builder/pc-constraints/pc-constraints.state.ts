import { PcConstraintWithoutValue, PcElementConstraintValues } from "src/typing-pc-builder";

export interface PcConstraintsState {
    loadingPcConstraints: boolean;
    pcConstraints: PcConstraintWithoutValue[];
    loadingSinglePcConstraint: boolean;
    singlePcConstraint: PcConstraintWithoutValue | undefined;
    loadingPcElementsConstraintValues: boolean;
    pcElementsConstraintValues: PcElementConstraintValues[];
    error: any;
};

export const pcConstraintsState: PcConstraintsState = {
    loadingPcConstraints: false,
    pcConstraints: [],
    loadingSinglePcConstraint: false,
    singlePcConstraint: undefined,
    loadingPcElementsConstraintValues: false,
    pcElementsConstraintValues: [],
    error: ''
};
