import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphCanvasComponent } from './graph-canvas.component';

@NgModule({
  declarations: [GraphCanvasComponent],
  imports: [CommonModule],
  exports: [GraphCanvasComponent],
})
export class GraphCanvasModule {}
