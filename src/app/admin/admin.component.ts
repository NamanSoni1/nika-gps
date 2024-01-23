import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  activeFunction: string | null = null;
  object!:boolean;
  user:boolean = true;

  constructor() { }

  ngOnInit(): void {
    this.userView();
  }

  setActiveFn(data: string) {
    this.activeFunction = data;
  }

  isActive(data: string) {
    return this.activeFunction === data;
  }

  objectView(): void {
    this.setActiveFn('object');
    this.object = true;
    this.user = false
  }

  userView():void{
    this.setActiveFn('user');
    this.user = true;
    this.object = false;
  }

}
