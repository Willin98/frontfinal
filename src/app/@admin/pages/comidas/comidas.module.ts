import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablePaginationModule } from '@shared/table-pagination/table-pagination.module';
import { ComidasComponent } from './comidas.component';
import { ComidasRoutingModule } from './comidas-routing.module';


@NgModule({
  declarations: [ComidasComponent],
  imports: [
    CommonModule,
    ComidasRoutingModule,
    TablePaginationModule
  ]
})
export class ComidasModule { }
