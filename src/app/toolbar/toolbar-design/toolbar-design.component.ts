import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ToolbarService } from 'src/app/services/toolbar.service';
import { ChartType, ChartTypeItem } from 'src/app/types';

@Component({
  selector: 'cm-toolbar-design',
  templateUrl: './toolbar-design.component.html',
  styleUrls: ['./toolbar-design.component.scss'],
})
export class ToolbarDesignComponent implements OnInit {
  public chartTypes: ChartType[] = [
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
  ];

  constructor(private toolbarService: ToolbarService) {}
  public chartTypeItem$: Observable<ChartTypeItem>;

  ngOnInit(): void {
    this.chartTypeItem$ = this.toolbarService.toolbarDesign$.pipe(
      map((td) => td.type)
    );
  }

  public handleChartTypeClick(chartType: ChartType) {
    this.toolbarService.toolbarDesign$.next({
      type: chartType.type,
    });
  }
}
