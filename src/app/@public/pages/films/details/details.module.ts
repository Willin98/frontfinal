import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailsRoutingModule } from './details-routing.module';
import { DetailsComponent } from './details.component';
import { QuantitySelectorModule } from '@mugan86/ng-shop-ui';


@NgModule({
  declarations: [DetailsComponent],
  imports: [
    CommonModule,
    DetailsRoutingModule,
    QuantitySelectorModule
  ]
})
export class DetailsModule { }
