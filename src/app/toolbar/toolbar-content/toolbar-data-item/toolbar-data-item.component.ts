import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  BehaviorSubject,
  combineLatest,
  fromEvent,
  merge,
  Subject,
} from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { SubscriptionCollection, unsubscribeCollection } from 'src/utils';

export interface ToolbarDataItem {
  title: string;
  value: string;
}

@Component({
  selector: 'tr[toolbar-data-item]',
  templateUrl: './toolbar-data-item.component.html',
  styleUrls: ['./toolbar-data-item.component.scss'],
  providers: [
    {
      useClass: ToolbarDataItemComponent,
      provide: NG_VALUE_ACCESSOR,
      multi: true,
    },
  ],
})
export class ToolbarDataItemComponent
  implements OnInit, AfterViewInit, OnDestroy, ControlValueAccessor {
  public onTitleChange$: BehaviorSubject<string> = new BehaviorSubject('');
  public onValueChange$: BehaviorSubject<string> = new BehaviorSubject('');
  private subs: SubscriptionCollection = {};
  public title: string = '';
  public value: string = '';

  constructor(private cdf: ChangeDetectorRef) {}

  private onChange = (value: ToolbarDataItem) => {};

  writeValue(obj: ToolbarDataItem | null): void {
    console.log('Write value');
    if (obj) {
      console.log(obj.title, obj.value, this.onValueChange$);
      // this.onTitleChange$.next(obj.title);
      // this.onValueChange$.next(obj.value);
      this.title = obj.title;
      this.value = obj.value;
    }
  }
  registerOnChange(fn: (value: ToolbarDataItem) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    //
  }

  ngAfterViewInit() {
    this.cdf.markForCheck();
    console.log('After view init');
  }

  ngOnInit(): void {
    this.subs.values = combineLatest([
      this.onTitleChange$,
      this.onValueChange$,
    ]).subscribe(([title, value]) => {
      console.log(title, value);

      this.onChange({ title, value });
    });
  }

  onDeleteClick() {
    this.onValueChange$.next('Delete');
    console.log(this.onValueChange$);
  }

  ngOnDestroy(): void {
    unsubscribeCollection(this.subs);
  }
}
