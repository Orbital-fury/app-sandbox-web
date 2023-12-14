import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  FactoryEntity,
  FactoryHttp,
  MachineEntity,
  MachineHttp,
  MachineWithModelAndFactory,
  ModelWithBrand,
} from '../../../typing-mmm';
import { Observable, filter, forkJoin, map } from 'rxjs';
import { MachineBrandService } from './machine-brand.service';
import { MmmFactoryService } from './mmm-factory.service';

@Injectable({
  providedIn: 'root',
})
export class MmmMachineService {
  private factories_url: string = 'assets/mmm/factory.json';
  private machines_url: string = 'assets/mmm/machine_new.json';
  private models_url: string = 'assets/mmm/machine-model.json';

  constructor(
    private http: HttpClient,
    private machineBrandService: MachineBrandService,
    private factoryService: MmmFactoryService
  ) {}

  getMachineEntities(): Observable<MachineEntity[]> {
    return this.http
      .get<MachineHttp>(this.machines_url)
      .pipe(map((machines) => machines.machines));
  }

  getMachineEntity(id: number): Observable<MachineEntity> {
    return this.getMachineEntities().pipe(
      map((machines) => machines.find((machine) => machine.id === id)),
      filter((machine) => !!machine)
    ) as Observable<MachineEntity>;
  }

  getMachineWithModel(id: number): Observable<MachineWithModelAndFactory> {
    return this.getMachinesWithModel().pipe(
      map((machines) => machines.find((machine) => machine.id === id)),
      filter((machine) => !!machine)
    ) as Observable<MachineWithModelAndFactory>;
  }

  getMachinesWithModel(): Observable<MachineWithModelAndFactory[]> {
    return forkJoin([
      this.factoryService.getFactoryEntities(),
      this.getMachineEntities(),
      this.machineBrandService.getModelsWithBrand(),
    ]).pipe(
      map(([factories, machines, models]) => {
        // Créer un dictionnaire pour accélérer la recherche des factories et des models par ID
        const factoriesDictionary: { [key: number]: FactoryEntity } = {};
        factories.forEach((factory) => {
          factoriesDictionary[factory.id] = factory;
        });
        const modelsDictionary: { [key: number]: ModelWithBrand } = {};
        models.forEach((model) => {
          modelsDictionary[model.id] = model;
        });

        // Mapper chaque machine en utilisant la factory correspondante
        return machines.map((machine) => {
          const factory: FactoryEntity = factoriesDictionary[machine.factoryId];
          const model: ModelWithBrand = modelsDictionary[machine.modelId];

          // Créer une nouvelle instance de MmmMachine avec la propriété factory
          const newMachine: MachineWithModelAndFactory = {
            id: machine.id,
            model: model,
            sn: machine.sn,
            needMaintenance: machine.needMaintenance,
            state: machine.state,
            factory: factory,
            createdAt: machine.createdAt,
            lastMaintenanceDate: machine.lastMaintenanceDate,
          };
          return newMachine;
        });
      })
    );
  }
}
