import { Injectable } from '@angular/core';
import {
  BrandEntity,
  BrandHttp,
  BrandWithModels,
  ModelEntity,
  ModelHttp,
  ModelWithBrand,
} from '../../../typing-mmm';
import { Observable, forkJoin, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MachineBrandService {
  private machine_brand: string = 'assets/mmm/machine-brand.json';
  private machine_model: string = 'assets/mmm/machine-model.json';

  constructor(private http: HttpClient) {}

  getBrandEntities(): Observable<BrandEntity[]> {
    return this.http
      .get<BrandHttp>(this.machine_brand)
      .pipe(map((brands) => brands.brands));
  }

  getModelEntities(): Observable<ModelEntity[]> {
    return this.http
      .get<ModelHttp>(this.machine_model)
      .pipe(map((models) => models.models));
  }

  getModelsWithBrand(): Observable<ModelWithBrand[]> {
    return forkJoin([this.getBrandEntities(), this.getModelEntities()]).pipe(
      map(([brands, models]) => {
        // Créer un dictionnaire pour accélérer la recherche des factories et des models par ID
        const brandsDictionary: { [key: number]: BrandEntity } = {};
        brands.forEach((brand) => {
          brandsDictionary[brand.id] = brand;
        });
        // Mapper chaque machine en utilisant la factory correspondante
        return models.map((model) => {
          const brand: BrandEntity = brandsDictionary[model.brandId];

          // Créer une nouvelle instance de MmmMachine avec la propriété factory
          const newModel: ModelWithBrand = {
            id: model.id,
            name: model.name,
            type: model.type,
            brand: brand,
          };
          return newModel;
        });
      })
    );
  }

  getBrandsWithModels(): Observable<BrandWithModels[]> {
    return forkJoin([this.getBrandEntities(), this.getModelEntities()]).pipe(
      map(([brands, models]) => {
        // Fusionner les données des usines et des machines
        const brandsWithModels: BrandWithModels[] = brands.map((brand) => {
          const brandModels = models.filter(
            (model) => model.brandId === brand.id
          );
          return {
            ...brand,
            models: brandModels,
          };
        });
        console.log(brandsWithModels);
        return brandsWithModels;
      })
    );
  }
}
