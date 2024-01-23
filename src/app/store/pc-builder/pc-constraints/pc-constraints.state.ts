import { PcConstraint } from "src/typing-pc-builder";

export interface PcConstraintsState {
    loadingPcConstraints: boolean;
    pcConstraints: PcConstraint[];
    error: any;
};

export const pcConstraintsState: PcConstraintsState = {
    loadingPcConstraints: false,
    pcConstraints: [],
    error: ''
};
