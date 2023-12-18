import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map } from 'rxjs';
import { FactoryEntity, FactoryHttp } from '../../../typing-mmm';

@Injectable({
  providedIn: 'root',
})
export class MmmFactoryService {
  private api_url: string = 'assets/mmm/factory.json';
  private new_api: string = 'http://localhost:8080/factories';

  constructor(private http: HttpClient) {}

  getFactoryEntities(): Observable<FactoryEntity[]> {
    return this.http
      .get<FactoryHttp>(this.new_api)
      .pipe(map((factories) => factories.factories));
  }

  getFactories(): Observable<FactoryEntity[]> {
    return this.getFactoryEntities();
  }

  /*
  getFactoriesWithMachines(): Observable<FactoryWithMachines[]> {
    const factoriesObservable = this.http.get<FactoryHttp>(this.api_url);
    const machinesObservable = this.http.get<MachineHttp>(this.machinesUrl);

    return forkJoin([factoriesObservable, machinesObservable]).pipe(
      map(([factories, machines]) => {
        // Fusionner les données des usines et des machines
        const factoriesWithMachines: FactoryWithMachines[] =
          factories.factories.map((factory) => {
            const factoryMachines = machines.machines.filter(
              (machine) => machine.factoryId === factory.id
            );
            return {
              ...factory,
              machines: factoryMachines,
            };
          });
        console.log(factoriesWithMachines);
        return factoriesWithMachines;
      })
    );
  }
  */
}
