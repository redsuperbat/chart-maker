import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ToolbarContentComponent } from './toolbar-content/toolbar-content.component';
import { ToolbarDesignComponent } from './toolbar-design/toolbar-design.component';

const routes: Routes = [
  {
    path: 'content',
    component: ToolbarContentComponent,
  },
  {
    path: 'design',
    component: ToolbarDesignComponent,
  },
  { path: '', redirectTo: '/content', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ToolbarRoutingModule {}
