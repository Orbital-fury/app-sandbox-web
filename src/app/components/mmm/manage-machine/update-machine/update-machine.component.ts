import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  Brand,
  FactoryWithoutMachines,
  MachineUpdate,
  Model,
  ModelWithoutBrand,
} from '../../../../../typing-mmm';
import { MachineBrandService } from '../../../../services/mmm/machine-brand.service';
import { MmmFactoryService } from '../../../../services/mmm/mmm-factory.service';

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

  machineBrands: Brand[] = [];
  machineModels: ModelWithoutBrand[] = [];
  factories: FactoryWithoutMachines[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private machineBrandService: MachineBrandService,
    private factoryService: MmmFactoryService
  ) { }

  ngOnInit(): void {
    this.machineBrandService
      .getBrands()
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

  brandSelected(brand: Brand): void {
    this.machineModels = brand.models;
  }

  brandCleared(): void {
    this.model!.patchValue('');
    this.model!.reset;
  }

  addMachine(): void {
    let newModel: Model = this.model!.value as unknown as Model;
    let newFactory: FactoryWithoutMachines = this.factory!
      .value as unknown as FactoryWithoutMachines;

    let availableId = 0;

    let newMachine: MachineUpdate = {
      id: availableId,
      modelId: newModel.id,
      sn: this.sn!.value!,
      needMaintenance: false,
      state: 'OFF',
      factoryId: newFactory.id ? newFactory.id : -1,
      createdAt: new Date(),
      lastMaintenanceDate: null,
    };
    console.log('new machine :', newMachine);
    //this.dbService.addMachine(newMachine);
  }
}
