import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Customer,
  Factories,
  Factory,
  FactoryWithMachines,
  Machines,
} from '../../../typing';
import { Observable, forkJoin, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FactoryService {
  private api_url: string = 'assets/factory-data.json';
  private machinesUrl: string = 'assets/machine-data.json';

  constructor(private http: HttpClient) {}

  getFactories(): Observable<Factory[]> {
    return this.http
      .get<Factories>(this.api_url)
      .pipe(map((factories) => factories.factories));
  }

  getFactoriesFrom(customerId: number): Observable<Factory[]> {
    return this.http
      .get<Factories>(this.api_url)
      .pipe(
        map((factories) =>
          factories.factories.filter(
            (factory) => factory.customerId === customerId
          )
        )
      );
  }

  getFactoriesWithMachinesFrom(
    customerId: number
  ): Observable<FactoryWithMachines[]> {
    const factoriesObservable = this.http.get<Factories>(this.api_url);
    const machinesObservable = this.http.get<Machines>(this.machinesUrl);

    return forkJoin([factoriesObservable, machinesObservable]).pipe(
      map(([factories, machines]) => {
        // Fusionner les données des usines et des machines
        const factoriesWithMachines: FactoryWithMachines[] = factories.factories
          .filter((factory) => factory.customerId === customerId)
          .map((factory) => {
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
}
