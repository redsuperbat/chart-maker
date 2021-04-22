import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject, combineLatest } from 'rxjs';
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
  implements OnInit, OnDestroy, ControlValueAccessor {
  public titleSubject$: BehaviorSubject<string>;
  public valueSubject$: BehaviorSubject<string>;
  private subs: SubscriptionCollection = {};
  private _value: ToolbarDataItem = {
    title: '',
    value: '',
  };
  private onChange: (value: ToolbarDataItem) => void;

  writeValue(obj: ToolbarDataItem): void {
    this._value = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    //
  }

  ngOnInit(): void {
    this.titleSubject$ = new BehaviorSubject(this._value.title);
    this.valueSubject$ = new BehaviorSubject(this._value.value);

    this.subs.values = combineLatest([
      this.titleSubject$,
      this.valueSubject$,
    ]).subscribe(([title, value]) => {
      this._value.title = title;
      this._value.value = value;
      this.onChange(this._value);
    });
  }

  ngOnDestroy(): void {
    unsubscribeCollection(this.subs);
  }
}
