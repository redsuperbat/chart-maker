import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import {
  ArcElement,
  BarController,
  BarElement,
  BubbleController,
  CategoryScale,
  Chart,
  DoughnutController,
  Filler,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  LogarithmicScale,
  PieController,
  PointElement,
  PolarAreaController,
  RadarController,
  RadialLinearScale,
  ScatterController,
  TimeScale,
  TimeSeriesScale,
  Title,
} from 'chart.js';
import { withLatestFrom } from 'rxjs/operators';
import { SubscriptionCollection, unsubscribeCollection } from 'src/utils';
import { ToolbarContent, ToolbarDesign } from '../types';
import {
  colors,
  defaultGraphConfig,
  renderMiddleTotal,
  renderWhite,
} from '../../assets/constants';
import { ToolbarService } from '../services/toolbar.service';
import { ExportGraphService } from '../services/export-graph.service';

@Component({
  selector: 'cm-graph-canvas',
  templateUrl: './graph-canvas.component.html',
  styleUrls: ['./graph-canvas.component.scss'],
})
export class GraphCanvasComponent implements AfterViewInit, OnDestroy {
  constructor(
    private toolbarService: ToolbarService,
    private exportGraphService: ExportGraphService
  ) {}

  private subs: SubscriptionCollection = {};

  @ViewChild('canvasWrapper')
  private canvasWrapper: ElementRef<HTMLDivElement>;
  private chart: Chart | null;
  private currentCanvas: HTMLCanvasElement;

  public ngAfterViewInit(): void {
    Chart.register(
      ArcElement,
      LineElement,
      BarElement,
      PointElement,
      BarController,
      BubbleController,
      DoughnutController,
      LineController,
      PieController,
      PolarAreaController,
      RadarController,
      ScatterController,
      CategoryScale,
      LinearScale,
      LogarithmicScale,
      RadialLinearScale,
      TimeScale,
      TimeSeriesScale,
      Filler,
      Legend,
      Title,
      renderWhite,
      renderMiddleTotal
    );
    this.chart = new Chart(this.createNewCanvasElement(), defaultGraphConfig);
    this.subs.toolbarContentSub = this.toolbarService.toolbarContent$.subscribe(
      (v) => this.handleToolbarContentUpdate(v)
    );
    this.subs.toolbarDesignSub = this.toolbarService.toolbarDesign$
      .pipe(withLatestFrom(this.toolbarService.toolbarContent$))
      .subscribe(([toolbarDesign, toolbarContent]) =>
        this.handleToolbarDesignUpdate(toolbarDesign, toolbarContent)
      );

    this.subs.graphExport = this.exportGraphService.onExportClick$.subscribe(
      () => this.exportCanvas()
    );
  }

  private exportCanvas() {
    this.currentCanvas.toBlob((blob) => {
      const uri = URL.createObjectURL(blob);
      const download = document.createElement('a');
      download.href = uri;
      download.download = 'chart.png';
      download.click();
    });
  }

  private createNewCanvasElement() {
    this.chart?.destroy();
    document.querySelector('#canvas')?.remove();
    const canvas = document.createElement('canvas');
    canvas.id = 'canvas';
    this.currentCanvas = canvas;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#fff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    this.canvasWrapper.nativeElement.appendChild(canvas);
    return canvas;
  }

  private async handleToolbarDesignUpdate(
    toolbarDesign: ToolbarDesign,
    toolbarContent: ToolbarContent
  ) {
    this.chart?.destroy();
    this.chart = null;
    const dataset = {
      data: toolbarContent.dataItems.map((d) => Number(d.value)),
      backgroundColor: toolbarContent.dataItems.map((_, i) => colors[i]),
      label: toolbarContent.chartTitle,
    };
    const chartConfig = { ...defaultGraphConfig };
    chartConfig.data.datasets = [dataset];
    chartConfig.data.labels = toolbarContent.dataItems.map((d) => d.item);
    chartConfig.type = toolbarDesign.type;
    this.chart = new Chart(this.createNewCanvasElement(), chartConfig);
  }

  private handleToolbarContentUpdate(toolbarContent: ToolbarContent) {
    if (this.chart?.options.plugins?.title) {
      this.chart.options.plugins.title.text = toolbarContent.chartTitle;
    }
    const dataset = {
      data: toolbarContent.dataItems.map((d) => Number(d.value)),
      backgroundColor: toolbarContent.dataItems.map((_, i) => colors[i]),
    };
    if (this.chart) {
      this.chart.data.datasets = [dataset];
      this.chart.data.labels = toolbarContent.dataItems.map((d) => d.item);
      this.chart.update();
    }
  }

  public ngOnDestroy() {
    unsubscribeCollection(this.subs);
  }
}
