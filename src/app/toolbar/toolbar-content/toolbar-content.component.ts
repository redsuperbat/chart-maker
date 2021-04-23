import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { ToolbarContentService } from 'src/app/services/toolbar-content.service';
import { SubscriptionCollection, unsubscribeCollection } from 'src/utils';
import { ToolbarDataItem } from './toolbar-data-item/toolbar-data-item.component';

@Component({
  selector: 'cm-toolbar-content',
  templateUrl: './toolbar-content.component.html',
  styleUrls: ['./toolbar-content.component.scss'],
})
export class ToolbarContentComponent implements OnInit, OnDestroy {
  constructor(
    private fb: FormBuilder,
    private toolbarContntentService: ToolbarContentService
  ) {}

  private subs: SubscriptionCollection = {};

  public form: FormGroup;

  ngOnInit(): void {
    const initalToolbarContent = this.toolbarContntentService.toolbarContent$
      .value;

    this.form = this.fb.group({
      title: [initalToolbarContent.chartTitle],
      dataItems: this.fb.array(
        initalToolbarContent.dataItems.map((dataItem) =>
          this.fb.group({
            item: [dataItem.item],
            value: [dataItem.value],
          })
        )
      ),
    });

    this.subs.formValueChanges = this.form.valueChanges.subscribe(
      this.toolbarContntentService.toolbarContent$
    );
  }

  get dataItemForms(): FormArray {
    return this.form.get('dataItems') as FormArray;
  }

  ngOnDestroy() {
    unsubscribeCollection(this.subs);
  }

  addDataItem() {
    this.dataItemForms.insert(
      this.dataItemForms.length,
      this.fb.group({
        item: [''],
        value: ['10'],
      })
    );
  }

  removeDataItem(index: number) {
    this.dataItemForms.removeAt(index);
  }
}
