import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-machine-calibration',
  templateUrl: './machine-calibration.component.html',
  styleUrls: ['./machine-calibration.component.scss'],
})
export class MachineCalibrationComponent {
  highcharts: typeof Highcharts = Highcharts; // required
  chartOptions: Highcharts.Options = {
    pane: {
      startAngle: -90,
      endAngle: 90,
    },

    // the value axis
    yAxis: {
      min: 0,
      max: 200,
      plotBands: [
        {
          from: 0,
          to: 120,
          color: '#55BF3B', // green
        },
        {
          from: 120,
          to: 160,
          color: '#DDDF0D', // yellow
        },
        {
          from: 160,
          to: 200,
          color: '#DF5353', // red
        },
        {
          from: 100,
          to: 140,
          color: '#6677ff',
          innerRadius: '100%',
          outerRadius: '110%',
        },
      ],
    },

    series: [
      {
        type: 'gauge',
        data: [80],
      },
    ],
  };

}
