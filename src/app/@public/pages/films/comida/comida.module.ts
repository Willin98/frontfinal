import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComidaRoutingModule } from './comida-routing.module';
import { ComidaComponent } from './comida.component';
import { QuantitySelectorModule } from '@mugan86/ng-shop-ui';



@NgModule({
  declarations: [ComidaComponent],
  imports: [
    CommonModule,
    ComidaRoutingModule,
    QuantitySelectorModule
  ]
})
export class ComidaModule { }
