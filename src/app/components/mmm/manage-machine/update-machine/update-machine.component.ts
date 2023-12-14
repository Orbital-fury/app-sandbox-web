import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MachineBrandService } from '../../../../services/mmm/machine-brand.service';
import { MmmFactoryService } from '../../../../services/mmm/mmm-factory.service';
import { IndexedDbService } from '../../../../services/indexed-db.service';
import {
  BrandWithModels,
  FactoryEntity,
  MachineEntity,
  ModelEntity,
} from '../../../../../typing-mmm';

@Component({
  selector: 'app-update-machine',
  templateUrl: './update-machine.component.html',
  styleUrls: ['./update-machine.component.scss'],
})
export class UpdateMachineComponent implements OnInit {
  update = 'Add';
  keyword = 'name';

  machineForm = this.formBuilder.group({
    brand: ['', Validators.required],
    model: ['', Validators.required],
    sn: ['', Validators.required],
    factory: [''],
  });

  machineBrands: BrandWithModels[] = [];
  machineModels: ModelEntity[] = [];
  factories: FactoryEntity[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private machineBrandService: MachineBrandService,
    private factoryService: MmmFactoryService,
    private dbService: IndexedDbService
  ) {}

  ngOnInit(): void {
    this.machineBrandService
      .getBrandsWithModels()
      .subscribe((data) => (this.machineBrands = data!));
    this.factoryService
      .getFactories()
      .subscribe((data) => (this.factories = data!));
  }

  get brand() {
    return this.machineForm.get('brand');
  }
  get model() {
    return this.machineForm.get('model');
  }
  get sn() {
    return this.machineForm.get('sn');
  }
  get factory() {
    return this.machineForm.get('factory');
  }

  brandSelected(brand: BrandWithModels): void {
    this.machineModels = brand.models;
  }

  brandCleared(): void {
    this.model!.patchValue('');
    this.model!.reset;
  }

  addMachine(): void {
    let newBrand: BrandWithModels = this.brand!
      .value as unknown as BrandWithModels;
    let newModel: ModelEntity = this.model!.value as unknown as ModelEntity;
    let newFactory: FactoryEntity = this.factory!
      .value as unknown as FactoryEntity;

    let availableId = 0;

    let newMachine: MachineEntity = {
      id: availableId,
      modelId: newModel.id,
      sn: this.sn!.value!,
      needMaintenance: false,
      state: 'Off',
      factoryId: newFactory.id ? newFactory.id : -1,
      createdAt: new Date(),
      lastMaintenanceDate: null,
    };
    console.log('new machine :', newMachine);
    //this.dbService.addMachine(newMachine);
  }
}
