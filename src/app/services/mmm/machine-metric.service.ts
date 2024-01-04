import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MachineMetric, MachineMetrics } from '../../../typing-mmm';
import { Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MachineMetricService {
  private machine_metric_1_url: string = 'assets/mmm/machine-metric-1.json';
  private machine_metric_2_url: string = 'assets/mmm/machine-metric-2.json';
  private machine_metric_3_url: string = 'assets/mmm/machine-metric-3.json';

  constructor(private http: HttpClient) {}

  getMachineMetric(machineId: number): Observable<MachineMetric[]> {
    let url: string;
    if (machineId % 3 === 0) {
      url = this.machine_metric_3_url;
    } else if (machineId % 2 === 0) {
      url = this.machine_metric_2_url;
    } else {
      url = this.machine_metric_1_url;
    }
    return this.http.get<MachineMetrics>(url).pipe(
      map((metrics) => {
        const machineMetrics = metrics.metrics;
        return machineMetrics;
      })
    );
  }
}
