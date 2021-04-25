import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { withLatestFrom } from 'rxjs/operators';
import {
  deepCopy,
  SubscriptionCollection,
  unsubscribeCollection,
} from 'src/utils';
import { ToolbarContent, ToolbarDesign } from '../types';
import { colors, defaultGraphConfig } from '../../assets/constants';
import { ToolbarService } from '../services/toolbar.service';
import { ExportGraphService } from '../services/export-graph.service';
import Chart from 'src/utils/chart-js';

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

  @ViewChild('canvas')
  private canvas: ElementRef<HTMLCanvasElement>;
  private chart: Chart;

  public ngAfterViewInit(): void {
    this.chart = new Chart(this.canvas.nativeElement, defaultGraphConfig);
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
    this.canvas.nativeElement.toBlob((blob) => {
      const uri = URL.createObjectURL(blob);
      const download = document.createElement('a');
      download.href = uri;
      download.download = 'chart.png';
      download.click();
    });
  }

  private async handleToolbarDesignUpdate(
    toolbarDesign: ToolbarDesign,
    toolbarContent: ToolbarContent
  ) {
    this.chart?.destroy();
    const dataset = this.generateDataset(toolbarContent);
    const chartConfig = deepCopy(defaultGraphConfig);
    chartConfig.data.datasets = [dataset];
    chartConfig.data.labels = toolbarContent.dataItems.map((d) => d.item);
    chartConfig.type = toolbarDesign.type;
    this.chart = new Chart(this.canvas.nativeElement, chartConfig);
  }

  private generateDataset(toolbarContent: ToolbarContent) {
    return {
      data: toolbarContent.dataItems.map((d) => Number(d.value)),
      backgroundColor: toolbarContent.dataItems.map((d) => d.color),
      label: toolbarContent.chartTitle,
    };
  }

  private handleToolbarContentUpdate(toolbarContent: ToolbarContent) {
    if (this.chart?.options.plugins?.title) {
      this.chart.options.plugins.title.text = toolbarContent.chartTitle;
    }
    const dataset = this.generateDataset(toolbarContent);
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
