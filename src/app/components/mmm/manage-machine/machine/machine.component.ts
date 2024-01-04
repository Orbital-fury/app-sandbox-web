import { Component, OnInit } from '@angular/core';
import {
  MachineMetric,
  Machine,
} from '../../../../../typing-mmm';
import { ActivatedRoute } from '@angular/router';
import { MmmMachineService } from '../../../../services/mmm/mmm-machine.service';
import { MachineMetricService } from '../../../../services/mmm/machine-metric.service';

@Component({
  selector: 'app-machine',
  templateUrl: './machine.component.html',
  styleUrls: ['./machine.component.scss'],
})
export class MachineComponent implements OnInit {
  machineId: number;
  machine: Machine;
  metrics: MachineMetric[];

  constructor(
    private route: ActivatedRoute,
    private machineService: MmmMachineService,
    private machineMetricService: MachineMetricService
  ) {}

  ngOnInit(): void {
    this.machineId = parseInt(this.route.snapshot.paramMap.get('machineId')!);
    this.machineService
      .getMachine(this.machineId)
      .subscribe((data) => (this.machine = data!));
    this.machineMetricService
      .getMachineMetric(this.machineId)
      .subscribe((data) => (this.metrics = data!));
  }
}
