import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'graficos';

  constructor() { }

  public barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType = 'line';
  public barChartLegend = true;
  public barChartData = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Potencia'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Esfuerzo'}
  ];
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  ngOnInit() {}
}
