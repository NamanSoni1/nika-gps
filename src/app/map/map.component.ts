import { AfterViewInit, Component, DoCheck, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import * as Leaflet from 'leaflet';
import 'leaflet.markercluster';
import 'leaflet-control-geocoder';
import { DataService } from '../service/data.service';
import { Subject, Subscription, filter, interval, takeUntil } from 'rxjs';
import { LatLngExpression } from 'leaflet';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

Leaflet.Icon.Default.imagePath = 'assets/';

interface MarkerData {
  position: { lat: number; lng: number };
  speed: boolean;
  name: string;
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit,DoCheck {
  
  selection!: number;
  map!: Leaflet.Map;
  markers: Leaflet.Marker[] = [];
  popup = Leaflet.popup();
  markerClusterGroup!: Leaflet.MarkerClusterGroup;
  previousMarkerPositions: { [name: string]: LatLngExpression } = {};
  private dataSubscription: Subject<void> = new Subject<void>();
  zoomStart!: boolean;
  markersLatLng: any;
  initialLatLng: any;
  isVisible: boolean = false;
  status!: boolean;
  mapObj: boolean = true;
  mapZeo: boolean = false;
  poi: boolean = false;
  notify: boolean = false;
  tour: boolean = false;

  constructor(private dataService: DataService,private router: Router) {
    this.filteredLocationList = this.markersLatLng;
  }

  menu!: boolean
  ngDoCheck(): void {
    let currentURl = this.router.url;
    if (currentURl == '/map') {
      this.menu = true;
    } else {
      this.menu = false;
    }
  }

  options = {
    layers: [
      Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      })
    ],
    zoom: 8
  };

  ngOnInit(): void {
    this.initializeMarker();
  }

  ngAfterViewInit(): void {
    this.startPolling();
  }

  ngOnDestroy(): void {
    this.stopPolling();
  }

  startPolling(): void {
    interval(3000)
      .pipe(
        takeUntil(this.dataSubscription)
      )
      .subscribe(() => this.initializeMarker());
  }

  stopPolling(): void {
    this.dataSubscription.next();
    this.dataSubscription.complete();
  }

  clickEvent() {
    this.status = !this.status
    this.isVisible = !this.isVisible
  }

  initializeMarker() {
    this.dataService.getLocation().subscribe((res) => {
      if (this.selection == undefined || this.selection == 1) {
        // console.log(res.all, "res.all");
        this.markersLatLng = res.all.map((data: any) => ({
          position: { lat: data.lat, lng: data.lng },
          speed: data.speed,
          name: data.name
        }));
        this.setLocalStorage();
      }
      else if (this.selection == 2) {
        // console.log(res.online, "res.online");
        this.markersLatLng = res.online.map((data: any) => ({
          position: { lat: data.lat, lng: data.lng },
          speed: data.speed,
          name: data.name
        }));
        // this.setLocalStorage();
      } else {
        // console.log(res.online, "res.offline");
        this.markersLatLng = res.offline.map((data: any) => ({
          position: { lat: data.lat, lng: data.lng },
          speed: data.speed,
          name: data.name
        }));
        // this.setLocalStorage();
      }
      this.drawLinesForMovingMarkers(this.markersLatLng);
      this.createMarkers(this.markersLatLng);
    },
      (error) => {
        console.error('Error fetching location:', error);
      }
    );
  }

  setLocalStorage() {
    localStorage.setItem('latLng', JSON.stringify(this.markersLatLng));
    const data: any = localStorage.getItem('latLng');
    this.initialLatLng = JSON.parse(data);
    // console.log(this.initialLatLng, "Initial LatLng");
  }

  drawLinesForMovingMarkers(markersData: MarkerData[]) {
    for (const data of markersData) {
      const name = data.name;
      const currentPosition = data.position;
      const previousPosition = this.previousMarkerPositions[name];

      if (previousPosition) {
        const polyline = Leaflet.polyline([previousPosition, currentPosition], {
          color: 'blue',
          weight: 3,
          opacity: 0.5,
        });

        this.map.addLayer(polyline);
      }
      // Update the previous marker position
      this.previousMarkerPositions[name] = currentPosition;
    }
  }

  createMarkers(markersData: MarkerData[]) {
    this.clearMarkers();

    this.markerClusterGroup = Leaflet.markerClusterGroup();

    // Check if this.initialLatLng is defined and is an array
    // if (Array.isArray(this.initialLatLng)) {
    //   // Draw polylines for all marker data
    //   for (let i = 0; i < Math.min(this.initialLatLng.length, markersData.length); i++) {
    //     const initialPosition = this.initialLatLng[i]?.position;
    //     const finalPosition = markersData[i]?.position;
    //     console.log(initialPosition,"initialPosition");
    //     console.log(finalPosition,"finalPosition");

    //     // Check if initialPosition and finalPosition are defined
    //     if (initialPosition && finalPosition) {
    //       const polyline = Leaflet.polyline([initialPosition, finalPosition], {
    //         color: 'blue',
    //         weight: 1,
    //         opacity: 0.5,
    //       });

    //       this.map.addLayer(polyline);
    //     }
    //   }
    // }

    // Add markers to the marker cluster group
    for (const data of markersData) {
      const markerOptions: Leaflet.MarkerOptions = {
        icon: Leaflet.icon({
          iconUrl: 'assets/taxe.png',
          iconSize: [32, 32],
          iconAnchor: [16, 16],
          popupAnchor: [0, -16]
        })
      };
      const marker = Leaflet.marker(data.position, markerOptions);
      marker.bindPopup(`<b>${data.name}</b>`);
      this.markerClusterGroup.addLayer(marker);
    }

    this.map.addLayer(this.markerClusterGroup);

    if (!this.zoomStart && markersData.length > 0) {
      const averagePosition = this.calculateAveragePosition(markersData);
      this.map.panTo(averagePosition);
    }
  }

  calculateAveragePosition(markersData: MarkerData[]): { lat: number; lng: number } {
    const totalMarkers = markersData.length
    const sumLat = markersData.reduce((acc, marker) => Number(acc) + Number(marker.position.lat), 0);
    const sumLng = markersData.reduce((acc, marker) => Number(acc) + Number(marker.position.lng), 0);
    const averageLat = sumLat / totalMarkers;
    const averageLng = sumLng / totalMarkers;
    return { lat: Number(averageLat.toFixed(2)), lng: Number(averageLng.toFixed(2)) };
  }

  clearMarkers() {
    if (this.markerClusterGroup) {
      this.map.removeLayer(this.markerClusterGroup);
    }
  }
  onMapReady($event: Leaflet.Map) {
    this.map = $event;
    this.map.on('zoomstart', () => {
      this.zoomStart = true;
    });
    this.map.on('click', (e) =>{
      // alert("You clicked the map at " + e.latlng)
      // this.popup
      // .setLatLng(e.latlng)
      // .setContent("You clicked the map at " + e.latlng.toString())
      // .openOn(this.map);
    });   

  }

  filteredLocationList: any = []
  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList = false
      return;
    }
    this.filteredLocationList = this.markersLatLng.filter((value: any) => {
      return value?.name.toLowerCase().includes(text.toLowerCase())
    });
    if (this.filteredLocationList.length > 0) {
      this.map.setView(this.filteredLocationList[0].position, 18)
    }

  }
  clearSearch(filterInput: HTMLInputElement) {
    filterInput.value = '';
    this.map.setView(this.markersLatLng[0]?.position, 5)
    this.filteredLocationList = false
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
