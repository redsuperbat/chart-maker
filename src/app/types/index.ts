export type ChartTypeItem = 'bar' | 'pie' | 'doughnut' | 'line';

export interface ChartType {
  type: ChartTypeItem;
  image: string;
}
