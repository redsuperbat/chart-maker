import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

export interface ToolbarDataItem {
  item: string;
  value: string;
}

@Component({
  selector: 'tr[toolbar-data-item]',
  templateUrl: './toolbar-data-item.component.html',
  styleUrls: ['./toolbar-data-item.component.scss'],
})
export class ToolbarDataItemComponent {
  @Input()
  dataItemForm: FormGroup;

  @HostListener('mouseenter')
  private onMouseOver() {
    this.onHover$.next(true);
  }
  @HostListener('mouseleave')
  private onMouseLeave() {
    this.onHover$.next(false);
  }

  @Output()
  public onDelete = new EventEmitter();

  public onHover$ = new BehaviorSubject(false);
}
