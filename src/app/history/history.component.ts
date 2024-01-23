import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  constructor() { }
  mapObj: boolean = true;
  mapZeo: boolean = false;
  poi: boolean = false;
  notify: boolean = false;
  tour: boolean = false;
  state: boolean = true;

  ngOnInit(): void {
  }
  mapObect() {
    this.mapObj = !this.mapObj
  }

  mapGeoZones() {
    this.mapZeo = !this.mapZeo
  }

  mapPOI() {
    this.poi = !this.poi
  }

  mapNotify() {
    this.notify = !this.notify
  }

  mapTour() {
    this.tour = !this.tour
  }

}
