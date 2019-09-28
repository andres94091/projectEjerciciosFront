import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { interval, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { GraficoService } from '../_services/grafico.service';

declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.css']
})
export class GraficoComponent implements OnInit {
  public options: any = {
    chart: {
      type: 'spline',
      animation: true, // don't animate in old IE
      marginRight: 10,
    },
    title: {
      text: 'Grafica'
    },
    credits: {
      enabled: false
    },
    tooltip: {
      formatter: function () {
        return `x: ${Highcharts.dateFormat('%e %b %y %H:%M:%S', this.x)} y: ${this.y.toFixed(2)}`
      }
    },
    xAxis: {
      type: 'datetime',
      labels: {
        formatter: function () {
          return Highcharts.dateFormat('%e %b %y', this.value);
        }
      }
    },
    series: [
      {
        name: 'Normal',
        turboThreshold: 500000,
        data: [[new Date('2018-02-05 18:38:31').getTime(), 2]]
      },
      {
        name: 'Abnormal',
        turboThreshold: 500000,
        data: [[new Date('2018-02-05 18:38:31').getTime(), 7]]
      }
    ]
  }

  routeSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private graficoService: GraficoService,
  ) {
   }

  ngOnInit() {
    this.routeSubscription = this.route.paramMap.subscribe(params => {
      this.loadGraphData().then(res => {
        console.log(res);
      });
    });
  }

  loadGraphData(): Promise<any> {
    return new Promise((resolve) => {
      this.graficoService.loadGraphData().subscribe(response => {
        const updated_normal_data = [];
        const updated_abnormal_data = [];
        response.forEach(row => {
          const temp_row = [
            new Date(row.timestamp).getTime(),
            row.value
          ];
          row.Normal === 1 ? updated_normal_data.push(temp_row) : updated_abnormal_data.push(temp_row);
        });
        this.options.series[0]['data'] = updated_normal_data;
        this.options.series[1]['data'] = updated_abnormal_data;
        Highcharts.chart('container', this.options);
      },
        error => {
          console.log(error)
        })
      resolve('ok')
    })
  }
}
