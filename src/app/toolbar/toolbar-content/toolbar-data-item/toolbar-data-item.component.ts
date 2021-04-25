import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'tr[toolbar-data-item]',
  templateUrl: './toolbar-data-item.component.html',
  styleUrls: ['./toolbar-data-item.component.scss'],
})
export class ToolbarDataItemComponent implements OnInit {
  public color: string;

  ngOnInit() {
    this.color = this.dataItemForm.controls['color'].value as string;
  }

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

  @Output()
  public onShiftOrder = new EventEmitter<'up' | 'down'>();

  public onHover$ = new BehaviorSubject(false);

  public handleColorChange(color: string) {
    this.dataItemForm.controls['color'].setValue(color);
  }
}
