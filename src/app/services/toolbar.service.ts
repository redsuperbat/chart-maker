import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToolbarContent, ToolbarDesign } from '../types';

@Injectable({
  providedIn: 'root',
})
export class ToolbarService {
  public toolbarDesign$ = new BehaviorSubject<ToolbarDesign>({
    type: 'doughnut',
  });
  public toolbarContent$ = new BehaviorSubject<ToolbarContent>({
    chartTitle: 'Shopping Cart',
    dataItems: [
      { item: 'Apple Watch', value: '75' },
      { item: 'Cuddly Bear', value: '45' },
      { item: 'Bubbly Champagne', value: '-12' },
      { item: 'Tricky Salamander', value: '23' },
    ],
  });
}
