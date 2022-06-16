import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CmsRoutingModule } from './cms-routing.module';
import { TaskComponent } from './pages/task/task.component';
import { GridComponent } from './pages/grid/grid.component';
import { LayoutComponent } from './pages/layout/layout.component';


@NgModule({
  declarations: [
    TaskComponent,
    GridComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    CmsRoutingModule
  ]
})
export class CmsModule { }
