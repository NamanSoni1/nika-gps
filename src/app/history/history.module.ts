import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoryRoutingModule } from './history-routing.module';
import { HistoryComponent } from './history.component';
import { MapModule } from '../map/map.module';

@NgModule({
  declarations: [
    HistoryComponent,
  ],
  imports: [
    CommonModule,
    HistoryRoutingModule,
    MapModule
  ]
})
export class HistoryModule { }
