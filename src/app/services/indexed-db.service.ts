// indexeddb.service.ts
import { Injectable } from '@angular/core';
import Dexie from 'dexie';

@Injectable({
  providedIn: 'root',
})
export class IndexedDbService extends Dexie {
  /*
  // Créer une base de données avec le nom 'MyDatabase'
  private factoriesTable: Dexie.Table<MmmFactory, number>;
  private machinesTable: Dexie.Table<RawMmmMachine, number>;

  constructor() {
    super('MyDatabase');

    // Définir la version de la base de données
    this.version(1).stores({
      factoriesTable: '++id, name, type, address',
      machinesTable:
        '++id, brand, type, model, sn, needMaintenance, state, factoryId, createdAt, lastMaintenanceDate',
    });

    // Accéder à la table
    this.factoriesTable = this.table('factoriesTable');
    this.machinesTable = this.table('machinesTable');
  }

  // Méthode pour ajouter un enregistrement à la table
  addFactory(factory: MmmFactory): Promise<number> {
    return this.factoriesTable.add(factory);
  }

  // Méthode pour obtenir tous les enregistrements de la table
  getAllFactories(): Promise<MmmFactory[]> {
    return this.factoriesTable.toArray();
  }

  addMachine(machine: RawMmmMachine): Promise<number> {
    return this.machinesTable.add(machine);
  }

  // Méthode pour obtenir tous les enregistrements de la table
  getAllMachines(): Promise<RawMmmMachine[]> {
    return this.machinesTable.toArray();
  }
  */
}
