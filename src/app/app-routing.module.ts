import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GraficoComponent } from './grafico/grafico.component';

const routes: Routes = [
  { path: 'grafico', component: GraficoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }