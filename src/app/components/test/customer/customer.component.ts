import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer, FactoryWithMachines } from '../../../../typing';
import { filter } from 'rxjs';
import { CustomerService } from '../../../services/test/customer.service';
import { FactoryService } from '../../../services/test/factory.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent implements OnInit {
  customerId: number;
  customer: Customer;
  factories: FactoryWithMachines[] = [];

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private factoryService: FactoryService
  ) {}

  ngOnInit(): void {
    this.customerId = parseInt(this.route.snapshot.paramMap.get('customerId')!);
    this.customerService
      .getCustomer(this.customerId)
      .pipe(filter((value) => value !== undefined))
      .subscribe((data) => (this.customer = data!));
    this.factoryService
      .getFactoriesWithMachinesFrom(this.customerId)
      .subscribe((data) => (this.factories = data));
  }
}
