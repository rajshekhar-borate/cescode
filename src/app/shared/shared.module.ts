import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent } from './components/chart/chart.component';
import { ChartService } from './components/chart/chart.service';



@NgModule({
  declarations: [ChartComponent],
  exports: [ChartComponent],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
