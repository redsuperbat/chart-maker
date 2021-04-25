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
      { item: 'Apple Watch', value: '75', color: '#c6e2ff' },
      { item: 'Cuddly Bear', value: '45', color: '#ffa500' },
      { item: 'Bubbly Champagne', value: '-12', color: '#bada55' },
      { item: 'Tricky Salamander', value: '23', color: '#ff7373' },
    ],
  });
}
