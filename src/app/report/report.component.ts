import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  loading!: boolean;
  activeFunction: string | null = null;

  variables: Record<string, boolean> = {
    MotionHistory: true,
    MotionInterval: false,
    VehicleShareLinkFile: false,
    TripsPerDay:false,
    NightTrips:false,
    DetailedToCustomers: false,
    AddingOfServices: false,
    TrackingObject: false,
    ByTwoGeozones: false,
    GroupZoneAccessControl: false,
    RoutePoints: false,
    TripsAndMileage:false,
    Violations:false,
    DriverAttentionControl:false,
    Events:false,
  };

  constructor() { }

  ngOnInit(): void {

  }

  setActiveFunction(functionName: string) {
    this.activeFunction = functionName;
  }

  isActive(functionName: string): boolean {
    return this.activeFunction === functionName;
  }

  resetAllVariables() {
    Object.keys(this.variables).forEach((key) => {
      this.variables[key] = false;
    });
  }

  motionHistory() {
    this.loading = true;
    setTimeout(() => {
      this.resetAllVariables();
      this.variables['motionHistory'] = true;
      this.setActiveFunction('motionHistory');
      this.loading = false;
    }, 500);

  }

  motionInterval() {
    this.loading = true;
    setTimeout(() => {
      this.resetAllVariables();
      this.variables['motionInterval'] = true;
      this.setActiveFunction('motionIntervals');
      this.loading = false;
    }, 500);
  }

  VehicleShareLinkFile() {
    this.loading = true;
    setTimeout(() => {
      this.resetAllVariables();
      this.variables['VehicleShareLinkFile'] = true;
      this.setActiveFunction('VehicleShareLinkFile');
      this.loading = false;
    }, 500);
  }

  tripsPerDay(){
    this.loading = true;
    setTimeout(() => {
      this.resetAllVariables();
      this.variables['TripsPerDay'] = true;
      this.setActiveFunction('TripsPerDay');
      this.loading = false;
    }, 500);
  }

  nightTrip(){
    this.loading = true;
    setTimeout(() => {
      this.resetAllVariables();
      this.variables['NightTrips'] = true;
      this.setActiveFunction('NightTrips');
      this.loading = false;
    }, 500);
  }

  detailedToCustomers() {
    this.loading = true;
    setTimeout(() => {
      this.resetAllVariables();
      this.variables['DetailedToCustomers'] = true;
      this.setActiveFunction('DetailedToCustomers');
      this.loading = false;
    }, 500);
  }

  commercialServices() {
    this.loading = true;
    setTimeout(() => {
      this.resetAllVariables();
      this.loading = false;
    }, 500);
  }

  addingOfServices() {
    this.loading = true;
    setTimeout(() => {
      this.resetAllVariables();
      this.variables['AddingOfServices'] = true;
      this.setActiveFunction('AddingOfServices');
      this.loading = false;
    }, 500);
  }

  geoZone() {
    this.loading = true;
    setTimeout(() => {
      this.resetAllVariables();
      this.variables['TrackingObject'] = true;
      this.setActiveFunction('TrackingObject');
      this.loading = false;
    }, 500);
  }

  twoGeozones() {
    this.loading = true;
    setTimeout(() => {
      this.resetAllVariables();
      this.variables['ByTwoGeozones'] = true;
      this.setActiveFunction('ByTwoGeozones');
      this.loading = false;
    }, 500);
  }

  groupZone() {
    this.loading = true;
    setTimeout(() => {
      this.resetAllVariables();
      this.variables['GroupZoneAccessControl'] = true;
      this.setActiveFunction('GroupZoneAccessControl');
      this.loading = false;
    }, 500);
  }

  routePts() {
    this.loading = true;
    setTimeout(() => {
      this.resetAllVariables();
      this.variables['RoutePoints'] = true;
      this.setActiveFunction('RoutePoints');
      this.loading = false;
    }, 500);
  }

  tripsAndMileage() {
    this.loading = true;
    setTimeout(() => {
      this.resetAllVariables();
      this.variables['TripsAndMileage'] = true;
      this.setActiveFunction('TripsAndMileage');
      this.loading = false;
    }, 500);
  }

  violations() {
    this.loading = true;
    setTimeout(() => {
      this.resetAllVariables();
      this.variables['Violations'] = true;
      this.setActiveFunction('Violations');
      this.loading = false;
    }, 500);
  }

  driverAttentionControl() {
    this.loading = true;
    setTimeout(() => {
      this.resetAllVariables();
      this.variables['DriverAttentionControl'] = true;
      this.setActiveFunction('DriverAttentionControl');
      this.loading = false;
    }, 500);
  }

  Events() {
    this.loading = true;
    setTimeout(() => {
      this.resetAllVariables();
      this.variables['Events'] = true;
      this.setActiveFunction('Events');
      this.loading = false;
    }, 500);
  }
}
