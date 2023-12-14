export interface Customer {
  id: number;
  name: string;
  address: string;
  stockIndustry: string | null;
}

export interface Customers {
  customers: Customer[];
}

export interface CustomerWithFactories {
  id: number;
  name: string;
  address: string;
  stockIndustry: string | null;
  factories: Factory[];
}

export interface CustomersWithFactories {
  customers: CustomerWithFactories[];
}

export interface Factory {
  id: number;
  name: string;
  customerId: number;
  address: string;
}

export interface Factories {
  factories: Factory[];
}

export interface FactoryWithMachines {
  id: number;
  name: string;
  customerId: number;
  address: string;
  machines: Machine[];
}

export interface FactoriesWithMachines {
  factories: FactoryWithMachines[];
}

export interface Machine {
  id: number;
  name: string;
  brand: string;
  factoryId: number;
}

export interface Machines {
  machines: Machine[];
}
