import { Component, OnInit } from '@angular/core';
import { ToolbarDesignService } from 'src/app/services/toolbar-design.service';
import { ChartType } from 'src/app/types';

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
  ];

  constructor(private toolbarDesignService: ToolbarDesignService) {}

  ngOnInit(): void {}

  public handleChartTypeClick(chartType: ChartType) {
    this.toolbarDesignService.toolbarDesign$.next({
      type: chartType.type,
    });
  }
}
