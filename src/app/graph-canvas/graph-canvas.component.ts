import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import {
  ArcElement,
  Chart,
  Legend,
  PieController,
  Plugin,
  Title,
} from 'chart.js';
import { SubscriptionCollection, unsubscribeCollection } from 'src/utils';
import {
  ToolbarContent,
  ToolbarContentService,
} from '../services/toolbar-content.service';

@Component({
  selector: 'cm-graph-canvas',
  templateUrl: './graph-canvas.component.html',
  styleUrls: ['./graph-canvas.component.scss'],
})
export class GraphCanvasComponent implements AfterViewInit, OnDestroy {
  constructor(private toolbarContentService: ToolbarContentService) {}

  private subs: SubscriptionCollection = {};

  @ViewChild('canvas')
  private chartCanvas: ElementRef<HTMLCanvasElement>;
  private chart: Chart;

  ngAfterViewInit(): void {
    Chart.register(PieController, ArcElement, Legend, Title);

    this.chart = new Chart(this.chartCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Red', 'Blue', 'Yellow'],
        datasets: [],
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
          },
        },

        maintainAspectRatio: false,
      },
    });
    this.subs.toolbarSub = this.toolbarContentService.toolbarContent$.subscribe(
      (v) => this.handleToolbarContentUpdate(v)
    );
  }

  private handleToolbarContentUpdate(toolbarContent: ToolbarContent) {
    console.log(toolbarContent);

    if (this.chart.options.plugins?.title) {
      this.chart.options.plugins.title.text = toolbarContent.chartTitle;
    }
    const dataset = {
      data: toolbarContent.dataItems.map((d) => Number(d.value)),
    };
    this.chart.data.datasets = [dataset];
    this.chart.data.labels = toolbarContent.dataItems.map((d) => d.item);
    this.chart.update();
    this.chart.render();
  }

  ngOnDestroy() {
    unsubscribeCollection(this.subs);
  }
}
