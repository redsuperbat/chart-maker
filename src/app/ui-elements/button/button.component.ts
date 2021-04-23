import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'button[cm-button]',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  @Input()
  color: string = '#3597ec';
}
