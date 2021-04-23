import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ChartTypeItem } from '../types';

export interface ToolbarDesign {
  type: ChartTypeItem;
}

@Injectable({
  providedIn: 'root',
})
export class ToolbarDesignService {
  public toolbarDesign$ = new BehaviorSubject<ToolbarDesign>({
    type: 'doughnut',
  });
  constructor() {}
}
