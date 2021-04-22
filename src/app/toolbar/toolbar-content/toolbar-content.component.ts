import { Component, OnInit } from '@angular/core';
import { ToolbarDataItem } from './toolbar-data-item/toolbar-data-item.component';

@Component({
  selector: 'cm-toolbar-content',
  templateUrl: './toolbar-content.component.html',
  styleUrls: ['./toolbar-content.component.scss'],
})
export class ToolbarContentComponent implements OnInit {
  public dataItems: ToolbarDataItem[] = [
    {
      title: 'Apple Watch',
      value: '75',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
