export interface FactoryEntity {
  id: number;
  name: string;
  type: string;
  address: string;
}

export interface FactoryHttp {
  factories: FactoryEntity[];
}

export interface FactoryWithMachines {
  id: number;
  name: string;
  type: string;
  address: string;
  machines: MachineEntity[];
}

export interface MachineHttp {
  machines: MachineEntity[];
}

export interface MachineEntity {
  id: number;
  modelId: number;
  sn: string;
  needMaintenance: boolean;
  state: string;
  factoryId: number;
  createdAt: Date;
  lastMaintenanceDate: Date | null;
}

export interface MachineWithModelAndFactory {
  id: number;
  model: ModelWithBrand;
  sn: string;
  needMaintenance: boolean;
  state: string;
  factory: FactoryEntity;
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

export interface BrandWithModels {
  id: number;
  name: string;
  website: string;
  hqAddress: string;
  models: ModelEntity[];
}

export interface ModelWithBrand {
  id: number;
  name: string;
  type: string;
  brand: BrandEntity;
}

export interface ModelEntity {
  id: number;
  name: string;
  type: string;
  brandId: number;
}

export interface ModelHttp {
  models: ModelEntity[];
}

export interface BrandEntity {
  id: number;
  name: string;
  website: string;
  hqAddress: string;
}

export interface BrandHttp {
  brands: BrandEntity[];
}
