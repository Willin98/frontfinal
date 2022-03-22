import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComidasComponent } from './comidas.component';

const routes: Routes = [
  {
    path: '',
    component: ComidasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComidasRoutingModule { }
