import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ArcElement, Chart, Legend, PieController, Title } from 'chart.js';

@Component({
  selector: 'cm-graph-canvas',
  templateUrl: './graph-canvas.component.html',
  styleUrls: ['./graph-canvas.component.scss'],
})
export class GraphCanvasComponent implements AfterViewInit {
  @ViewChild('canvas')
  private chartCanvas: ElementRef<HTMLCanvasElement>;

  private chart: Chart;

  ngAfterViewInit(): void {
    Chart.register(PieController, ArcElement, Legend, Title);

    this.chart = new Chart(this.chartCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Red', 'Blue', 'Yellow'],
        datasets: [
          {
            label: 'My First Dataset',
            data: [300, 50, 100],
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)',
            ],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        layout: {
          padding: 45,
        },
        plugins: {
          title: {
            display: true,
            font: {
              size: 30,
            },
            text: 'Custom Chart Title',
          },
        },

        maintainAspectRatio: false,
      },
    });
  }
}
