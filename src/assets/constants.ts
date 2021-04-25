import { ChartConfiguration } from 'chart.js';
import { ChartType } from 'src/app/types';

export const defaultGraphConfig: ChartConfiguration = {
  type: 'doughnut',
  data: {
    datasets: [],
  },
  options: {
    layout: {
      padding: 35,
    },
    plugins: {
      title: {
        display: true,
        font: {
          size: 30,
        },
      },
    },
    maintainAspectRatio: true,
  },
};

export const colors = [
  '#bada55',
  '#7fe5f0',
  '#ff7373',
  '#ffa500',
  '#40e0d0',
  '#ff7f50',
  '#c6e2ff',
  '#7fffd4',
];

export const chartTypes: ChartType[] = [
  {
    type: 'doughnut',
    image: '/assets/images/doughnut-chart.svg',
  },
  {
    type: 'pie',
    image: '/assets/images/pie-chart.svg',
  },
  {
    type: 'line',
    image: '/assets/images/line-chart.svg',
  },
  {
    type: 'bar',
    image: '/assets/images/bar-chart.svg',
  },
  {
    type: 'radar',
    image: '/assets/images/radar-chart.svg',
  },
  {
    type: 'polarArea',
    image: '/assets/images/polar-area-chart.svg',
  },
];
