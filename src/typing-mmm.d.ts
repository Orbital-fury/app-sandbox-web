export interface Factories {
  factories: Factory[];
}

export interface Factory {
  id: number;
  name: string;
  type: string;
  address: string;
  machines: MachineWithoutFactory[];
}

export interface FactoryWithoutMachines {
  id: number;
  name: string;
  type: string;
  address: string;
}

export interface Machines {
  machines: Machine[];
}

export interface Machine {
  id: number;
  model: Model;
  sn: string;
  needMaintenance: boolean;
  state: string;
  factory: FactoryWithoutMachines;
  createdAt: Date;
  lastMaintenanceDate: Date | null;
}

export interface MachineWithoutFactory {
  id: number;
  model: Model;
  sn: string;
  needMaintenance: boolean;
  state: string;
  factoryId: number;
  createdAt: Date;
  lastMaintenanceDate: Date | null;
}

export interface MachineUpdate {
  id: number;
  modelId: number;
  sn: string;
  needMaintenance: boolean;
  state: string;
  factoryId: number;
  createdAt: Date;
  lastMaintenanceDate: Date | null;
}

export interface MaintenanceData {
  target: number;
  critical: number;
}

export interface MachineMetric {
  id: number;
  name: string;
  unit: string;
  current: number;
  dataType: string;
  dataMaintenance: MaintenanceData;
}

export interface MachineMetrics {
  metrics: MachineMetric[];
}

export interface Model {
  id: number;
  name: string;
  type: string;
  brand: Brand;
}

export interface Models {
  models: Model[];
}

export interface ModelWithoutBrand {
  id: number;
  name: string;
  type: string;
}

export interface Brand {
  id: number;
  name: string;
  website: string;
  hqAddress: string;
  models: ModelWithoutBrand[];
}

export interface Brands {
  brands: Brand[];
}

export type MachineState = 'RUNNING' | 'IDLE' | 'STOP' | 'OFF';
