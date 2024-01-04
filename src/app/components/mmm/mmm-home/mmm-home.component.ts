import { Component, OnInit } from '@angular/core';
import { MmmFactoryService } from '../../../services/mmm/mmm-factory.service';
import { Factory, FactoryWithoutMachines } from '../../../../typing-mmm';

@Component({
  selector: 'app-mmm-home',
  templateUrl: './mmm-home.component.html',
  styleUrls: ['./mmm-home.component.scss'],
})
export class MmmHomeComponent implements OnInit {
  factories: Factory[] = [];
  orderBy: string = 'Name';
  sortByDesc: boolean = false;

  constructor(private factoryService: MmmFactoryService) {}

  ngOnInit(): void {
    this.factoryService.getFactories().subscribe((data) => {
      this.factories = data;
      this.orderByFunc('Name');
    });
  }

  orderByFunc(orderBy: string): void {
    if (orderBy === 'Name') {
      this.factories = this.factories.sort((f1, f2) => {
        let order = f1.name.localeCompare(f2.name);
        if (this.sortByDesc) {
          order = -order;
        }
        return order;
      });
    } else if (orderBy === 'Type') {
      this.factories = this.factories.sort((f1, f2) => {
        let order = f1.type.localeCompare(f2.type);
        if (this.sortByDesc) {
          order = -order;
        }
        return order;
      });
    }
    this.orderBy = orderBy;
  }

  reverseOrder(): void {
    this.factories.reverse();
    this.sortByDesc = !this.sortByDesc;
  }
}
