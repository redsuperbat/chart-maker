import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar.component';
import { ToolbarContentComponent } from './toolbar-content/toolbar-content.component';
import { ToolbarDesignComponent } from './toolbar-design/toolbar-design.component';
import { ToolbarRoutingModule } from './toolbar-routing.module';
import { ToolbarDataItemComponent } from './toolbar-content/toolbar-data-item/toolbar-data-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiElementsModule } from '../ui-elements/ui-elements.module';
import { ColorPickerModule } from 'ngx-color-picker';

@NgModule({
  declarations: [
    ToolbarComponent,
    ToolbarContentComponent,
    ToolbarDesignComponent,
    ToolbarDataItemComponent,
  ],
  imports: [
    CommonModule,
    ToolbarRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    UiElementsModule,
    ColorPickerModule,
  ],
  exports: [ToolbarComponent],
})
export class ToolbarModule {}
