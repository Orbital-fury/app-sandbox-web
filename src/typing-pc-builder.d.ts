export type PcElementTypeEnum = "CASE" | "MOBO" | "POWER" | "FAN" | "AIO" | "HDD" | "SSD" | "CPU" | "RAM" | "GPU" | "STORAGE" | "COOLING";

export type ConstraintType = "SAME" | "MAX" | "LIMIT" | "CAPACITY";

export interface PcElementType {
    id: number;
    name: string;
    code: PcElementTypeEnum;
}

export interface PcElementTypes {
    pcElementTypes: PcElementType[];
}

export interface PcElements {
    pcElements: PcElement[];
}

export interface PcElement {
    id: number;
    brand: string;
    model: string;
    price: number;
    img: string | null;
    type: PcElementType;
    constraints: PcConstraint[];
    specifications: PcSpecification[];
}

export interface PcElementBasis {
    id: number;
    brand: string;
    model: string;
    price: number;
    img: string | null;
    type: PcElementTypeEnum;
}

export interface PcElementConstraintValues {
    pcElementInfo: PcElementBasis;
    constraintValues: string[];
}

export interface PcElementsConstraintValues {
    pcElements: PcElementConstraintValues[];
}

export abstract class PcConstraint {
    id: number;
    name: string;
    code: string;
    type: ConstraintType;
    values: string[];
}

export abstract class PcConstraintWithoutValue {
    id: number;
    name: string;
    code: string;
    type: ConstraintType;
}

export interface NewPcConstraint {
    name: string;
    code: string;
    type: ConstraintType;
}

export interface PcConstraintsWithoutValue {
    pcConstraints: PcConstraintWithoutValue[];
}

export abstract class PcSpecification {
    id: number;
    name: string;
    code: string;
    values: string[];
}

export type MoboSize = "ATX" | "E_ATX" | "MICRO_ATX";
export type RamFrequency = 2400 | 2666 | 2933 | 3000 | 3200 | 3600 | 4800;
export type Socket = "AM4" | "AM5" | "1700";
export type Chipset = "B550" | "B650" | "B760" | "B660" | "Z790" | "X670";
export type StorageType = '2.5"' | '3.5"' | 'M.2';
export type CoolingType = 'FAN' | 'AIO';
export type CoolingFanSpace = number; // entre 140 et 180 cm
export type AoiFanSize = number; // 2x120cm, 2x140cm, 3x120cm, 3x140cm
export type StorageCapacity = number; // e.g.: 2x2.5" + 1x3.5"
export type GpuLength = number; // entre 320 et 380 cm
//export type PcConstraint = MoboSize | RamFrequency | Socket | Chipset | StorageType | CoolingFanSpace | AoiFanSize | StorageCapacity | GpuLength;
