import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { ArcElement, Chart, Legend, PieController, Title } from 'chart.js';
import { withLatestFrom } from 'rxjs/operators';
import { SubscriptionCollection, unsubscribeCollection } from 'src/utils';
import {
  ToolbarContent,
  ToolbarContentService,
} from '../services/toolbar-content.service';
import {
  ToolbarDesign,
  ToolbarDesignService,
} from '../services/toolbar-design.service';

@Component({
  selector: 'cm-graph-canvas',
  templateUrl: './graph-canvas.component.html',
  styleUrls: ['./graph-canvas.component.scss'],
})
export class GraphCanvasComponent implements AfterViewInit, OnDestroy {
  constructor(
    private toolbarContentService: ToolbarContentService,
    private toolbarDesignService: ToolbarDesignService
  ) {}

  private subs: SubscriptionCollection = {};

  @ViewChild('canvas')
  private chartCanvas: ElementRef<HTMLCanvasElement>;

  private chart: Chart;

  ngAfterViewInit(): void {
    Chart.register(PieController, ArcElement, Legend, Title);

    this.chart = new Chart(this.chartCanvas.nativeElement, {
      type: 'doughnut',
      data: {
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
    this.subs.toolbarContentSub = this.toolbarContentService.toolbarContent$.subscribe(
      (v) => this.handleToolbarContentUpdate(v)
    );
    this.subs.toolbarDesignSub = this.toolbarDesignService.toolbarDesign$
      .pipe(withLatestFrom(this.toolbarContentService.toolbarContent$))
      .subscribe(([toolbarDesign, toolbarContent]) =>
        this.handleToolbarDesignUpdate(toolbarDesign, toolbarContent)
      );
  }

  private async handleToolbarDesignUpdate(
    toolbarDesign: ToolbarDesign,
    toolbarContent: ToolbarContent
  ) {
    this.chart.destroy();
    if (toolbarDesign.type !== 'doughnut') {
      await this.importChartModules();
    }
    const dataset = {
      data: toolbarContent.dataItems.map((d) => Number(d.value)),
    };
    this.chart = new Chart(this.chartCanvas.nativeElement, {
      type: toolbarDesign.type,
      data: {
        labels: toolbarContent.dataItems.map((d) => d.item),
        datasets: [dataset],
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
            text: toolbarContent.chartTitle,
          },
        },
        maintainAspectRatio: false,
      },
    });
  }

  private handleToolbarContentUpdate(toolbarContent: ToolbarContent) {
    if (this.chart.options.plugins?.title) {
      this.chart.options.plugins.title.text = toolbarContent.chartTitle;
    }
    const dataset = {
      data: toolbarContent.dataItems.map((d) => Number(d.value)),
    };
    this.chart.data.datasets = [dataset];
    this.chart.data.labels = toolbarContent.dataItems.map((d) => d.item);
    this.chart.update();
  }

  private async importChartModules() {
    const {
      BarController,
      BarElement,
      ScatterController,
      Tooltip,
      LineController,
      LinearScale,
      RadarController,
      BubbleController,
      CategoryScale,
      PointElement,
      LineElement,
    } = await import(/* webpackIgnore: true */ 'chart.js');
    Chart.register(
      BarController,
      PointElement,
      BarElement,
      Tooltip,
      ScatterController,
      LineController,
      RadarController,
      CategoryScale,
      LinearScale,
      BubbleController,
      LineElement
    );
  }

  ngOnDestroy() {
    unsubscribeCollection(this.subs);
  }
}
