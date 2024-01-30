import { PcConstraintWithoutValue } from "src/typing-pc-builder";

export interface PcConstraintsState {
    loadingPcConstraints: boolean;
    pcConstraints: PcConstraintWithoutValue[];
    loadingSinglePcConstraint: boolean;
    singlePcConstraint: PcConstraintWithoutValue | undefined;
    error: any;
};

export const pcConstraintsState: PcConstraintsState = {
    loadingPcConstraints: false,
    pcConstraints: [],
    loadingSinglePcConstraint: false,
    singlePcConstraint: undefined,
    error: ''
};
