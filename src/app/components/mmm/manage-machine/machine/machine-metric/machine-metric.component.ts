import { Component, Input, OnInit } from '@angular/core';
import { MachineMetric } from '../../../../../../typing-mmm';
import * as Highcharts from 'highcharts';
import HighChartsMore from 'highcharts/highcharts-more';

HighChartsMore(Highcharts);

@Component({
  selector: 'app-machine-metric',
  templateUrl: './machine-metric.component.html',
  styleUrls: ['./machine-metric.component.scss'],
})
export class MachineMetricComponent implements OnInit {
  @Input() metric: MachineMetric;

  highcharts: typeof Highcharts = Highcharts; // required
  chartOptions: Highcharts.Options = {
    title: undefined,
    chart: {
      height: '80%',
      //spacingBottom: -100,
      //spacingTop: -50,
      marginTop: -20,
      marginBottom: -100,
    },
    pane: {
      startAngle: -90,
      endAngle: 90,
      background: undefined,
    },

    plotOptions: {
      gauge: {
        dataLabels: { color: 'black', borderWidth: 0 },
        dial: {
          rearLength: '-80%',
          baseLength: '80%',
          radius: '80%',
          baseWidth: 20,
        },
        pivot: {
          radius: 0,
        },
      },
    },
    series: [],
  };

  ngOnInit(): void {
    const maxGauge = Math.max(
      this.metric.dataMaintenance.critical,
      this.metric.current
    );

    const metric = this.metric;

    this.chartOptions.yAxis = {
      min: 0,
      max: maxGauge,
      plotBands: [
        {
          from: 0,
          to: this.metric.dataMaintenance.target,
          color: '#55BF3B', // green
          thickness: '20%',
        },
        {
          from: this.metric.dataMaintenance.target,
          to: this.metric.dataMaintenance.critical,
          color: '#DDDF0D', // yellow
          thickness: '20%',
        },
        {
          from: this.metric.dataMaintenance.critical,
          to: maxGauge,
          color: '#DF5353', // red
          thickness: '20%',
        },
      ],
      tickLength: 0,
      minorTickLength: 0,
      labels: {
        enabled: false,
      },
    };

    this.chartOptions.series!.push({
      type: 'gauge',
      data: [this.metric.current],
      dataLabels: {
        format: '{point.y} ' + this.metric.unit,
        verticalAlign: 'middle',
      },
      tooltip: {
        pointFormatter: function () {
          return `Current: ${this.y}<br><span style="color: rgba(255, 193, 7)">Limit: ${metric.dataMaintenance.target}</span><br><span style="color: rgba(220, 53, 69)">Critical: ${metric.dataMaintenance.critical}</span>`;
        },
        //pointFormat: `Current: {point.y}<br><span style="color: red">Limit: ${metric.dataMaintenance.target}</span><br>Critical: ${metric.dataMaintenance.critical}`,
      },
    });
  }
}
