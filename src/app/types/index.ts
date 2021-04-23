export type ChartTypeItem = 'bar' | 'pie' | 'doughnut' | 'line';

export interface ChartType {
  type: ChartTypeItem;
  image: string;
}

export interface ToolbarContent {
  chartTitle: string;
  dataItems: ToolbarDataItem[];
}

export interface ToolbarDesign {
  type: ChartTypeItem;
}

export interface ToolbarDataItem {
  item: string;
  value: string;
}
