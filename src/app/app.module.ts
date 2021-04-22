import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphCanvasModule } from './graph-canvas/graph-canvas.module';
import { ToolbarModule } from './toolbar/toolbar.module';
import { UiElementsModule } from './ui-elements/ui-elements.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UiElementsModule,
    ToolbarModule,
    GraphCanvasModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
