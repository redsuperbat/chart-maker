import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
import { ToolbarService } from 'src/app/services/toolbar.service';
import { ToolbarContent } from 'src/app/types';
import {
  getRandomColor,
  SubscriptionCollection,
  unsubscribeCollection,
} from 'src/utils';

@Component({
  selector: 'cm-toolbar-content',
  templateUrl: './toolbar-content.component.html',
  styleUrls: ['./toolbar-content.component.scss'],
})
export class ToolbarContentComponent implements OnInit, OnDestroy {
  constructor(
    private fb: FormBuilder,
    private toolbarService: ToolbarService
  ) {}

  private subs: SubscriptionCollection = {};
  public form: FormGroup;

  ngOnInit(): void {
    const initalToolbarContentData = this.toolbarService.toolbarContent$.value;
    this.generateForm(initalToolbarContentData);

    this.subs.formValueChanges = this.form.valueChanges
      .pipe(debounceTime(300))
      .subscribe(this.toolbarService.toolbarContent$);
  }

  private generateForm(toolbarContent: ToolbarContent) {
    this.form = this.fb.group({
      chartTitle: [toolbarContent.chartTitle],
      dataItems: this.fb.array(
        toolbarContent.dataItems.map((dataItem) =>
          this.fb.group({
            item: [dataItem.item],
            value: [dataItem.value],
            color: [dataItem.color],
          })
        )
      ),
    });
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
        color: [getRandomColor()],
      })
    );
  }

  shiftOrderDataItem(order: 'up' | 'down', index: number) {
    if (index === 0 && order === 'up') return;
    if (index === this.dataItemForms.length - 1 && order === 'down') return;
    const dataItemFormGroup = this.dataItemForms.at(index) as FormGroup;
    this.dataItemForms.removeAt(index);
    this.dataItemForms.insert(
      order === 'up' ? index - 1 : index + 1,
      dataItemFormGroup
    );
  }

  removeDataItem(index: number) {
    this.dataItemForms.removeAt(index);
  }
}
