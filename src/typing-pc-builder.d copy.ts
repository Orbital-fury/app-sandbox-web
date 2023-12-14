export type PartType_ = "CASE" | "MOTHERBOARD" | "POWER_SUPPLY" | "FAN" | "STORAGE" | "SSD_M2" | "CPU" | "RAM" | "GPU";

export enum PartType {
    Case = "CASE",
    Motherboard = "MOTHERBOARD",
    PowerSupply = "POWER_SUPPLY",
    Fan = "FAN",
    Storage = "STORAGE",
    SsdM2 = "SSD_M2",
    Cpu = "CPU",
    Ram = "RAM",
    Gpu = "GPU"
}

export abstract class PcElement {
    brand: string;
    model: string;
    price: number;
    img: string | null;
    type: PartType_;
    constraint: PcConstraint[];
    specifications: Specification[];
}

export interface Case extends PcElement {
    type: PartType.Case;
    moboSize: MoboSize;
    coolingFanSpace: CoolingFanSpace;
    aoiFanSize: AoiFanSize;
    storageCapacity: StorageCapacity;
    gpuLength: GpuLength;
}

export interface Cpu extends PcElement {
    cpuFrequency: number;
    numberOfCore: number;
    socket: Socket;
    chipsets: Chipset[];
}

export interface Motherboard extends PcElement {
    ssdM2Capacity: number;
    moboSize: MoboSize;
    socket: Socket;
    chipset: Chipset;
    coolingFanSpace: CoolingFanSpace;
    ramFrequencies: RamFrequency[];
}

export interface Gpu extends PcElement {
    GpuLength: number;
    GpuPower: number;
}

export interface PowerSupply extends PcElement {
    power: number;
}

export interface Ram extends PcElement {
    numberOfRam: number;
    ramMemory: number;
    ramFrequency: RamFrequency;
}

export abstract class Storage extends PcElement {
    storageType: StorageType;
    storageSpace: number;
}

export interface Hdd extends Storage {
    rpm: number;
}

export interface Ssd extends Storage {
}

export abstract class Cooling extends PcElement {
    coolingType: CoolingType;
    socket: Socket;
}

export interface FanCooling extends Cooling {
    coolingFanSpace: CoolingFanSpace;
}

export interface AioCooling extends Cooling {
    aioFanSize: AoiFanSize;
}

export abstract class PcConstraint {
    name: string;
    code: string;
    value: MoboSize | RamFrequency | Socket | Chipset | StorageType | CoolingFanSpace | AoiFanSize | StorageCapacity | GpuLength;
}

export abstract class Specification {
    name: string;
    code: string;
    value: string | number | string[] | number[];
}

export type MoboSize = "ATX" | "E_ATX" | "MICRO_ATX";
export type RamFrequency = 2400 | 2666 | 2933 | 3000 | 3200 | 3600;
export type Socket = "AM4" | "AM5" | "1700";
export type Chipset = "B550" | "B650" | "B760" | "B660" | "Z790" | "X670";
export type StorageType = '2.5"' | '3.5"' | 'M.2';
export type CoolingType = 'FAN' | 'AIO';
export type CoolingFanSpace = number; // entre 140 et 180 cm
export type AoiFanSize = number; // 2x120cm, 2x140cm, 3x120cm, 3x140cm
export type StorageCapacity = number; // e.g.: 2x2.5" + 1x3.5"
export type GpuLength = number; // entre 320 et 380 cm
//export type PcConstraint = MoboSize | RamFrequency | Socket | Chipset | StorageType | CoolingFanSpace | AoiFanSize | StorageCapacity | GpuLength;
