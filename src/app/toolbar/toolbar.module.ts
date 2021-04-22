import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar.component';
import { ToolbarContentComponent } from './toolbar-content/toolbar-content.component';
import { ToolbarDesignComponent } from './toolbar-design/toolbar-design.component';
import { ToolbarRoutingModule } from './toolbar-routing.module';
import { ToolbarDataItemComponent } from './toolbar-content/toolbar-data-item/toolbar-data-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
  ],
  exports: [ToolbarComponent],
})
export class ToolbarModule {}
