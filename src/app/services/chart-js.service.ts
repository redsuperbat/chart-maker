import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChartJsService {
  constructor() {}

  async loadChartMaker() {
    const { Chart } = await import('chart.js');

    return Chart;
  }
}
