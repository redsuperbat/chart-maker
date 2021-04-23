import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToolbarDataItem } from '../toolbar/toolbar-content/toolbar-data-item/toolbar-data-item.component';

export interface ToolbarContent {
  chartTitle: string;
  dataItems: ToolbarDataItem[];
}

@Injectable({
  providedIn: 'root',
})
export class ToolbarContentService {
  public toolbarContent$ = new BehaviorSubject<ToolbarContent>({
    chartTitle: 'Shopping Cart',
    dataItems: [
      { item: 'Apple Watch', value: '75' },
      { item: 'Cuddly Bear', value: '45' },
    ],
  });
}
