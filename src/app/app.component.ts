import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck {
  menu!: boolean

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute) {
    // Check route path
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)).subscribe(() => {
        this.isMapRoute();
      })
  }
  ngDoCheck(): void {
    let currentURl = this.router.url;
    if (currentURl == '/login') {
      this.menu = false;
    } else {
      this.menu = true;
    }
  }

  isMapRoute(): boolean {
    const currentRoute = this.activatedRoute.snapshot.firstChild?.routeConfig?.path;
    return currentRoute === 'map';
  }

}