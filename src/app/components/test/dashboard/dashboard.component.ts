import { Component, OnInit } from '@angular/core';
import { CustomerWithFactories, Factory, Machine } from '../../../../typing';
import { MachineService } from '../../../services/test/machine.service';
import { CustomerService } from '../../../services/test/customer.service';
import { FactoryService } from '../../../services/test/factory.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  customers: CustomerWithFactories[] = [];
  factories: Factory[] = [];
  machines: Machine[] = [];

  constructor(
    private customerService: CustomerService,
    private factoryService: FactoryService,
    private machineService: MachineService
  ) {}

  ngOnInit(): void {
    this.customerService
      .getCustomersWithFactories()
      .subscribe((data) => (this.customers = data));
    this.factoryService
      .getFactories()
      .subscribe((data) => (this.factories = data));
    this.machineService
      .getMachines()
      .subscribe((data) => (this.machines = data));
  }
}
