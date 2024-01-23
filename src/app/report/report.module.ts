import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { ReportComponent } from './report.component';
import { ReportPeriodComponent } from './report-period/report-period.component';


@NgModule({
  declarations: [
    ReportComponent,
    ReportPeriodComponent
  ],
  imports: [
    CommonModule,
    ReportRoutingModule
  ]
})
export class ReportModule { }
