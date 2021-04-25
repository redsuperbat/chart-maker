import { ChartConfiguration } from 'chart.js';

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
