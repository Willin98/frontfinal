import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProximamenteRoutingModule } from './proximamente-routing.module';
import { ProximamenteComponent } from './proximamente.component';


@NgModule({
  declarations: [ProximamenteComponent],
  imports: [
    CommonModule,
    ProximamenteRoutingModule
  ]
})
export class ProximamenteModule { }
