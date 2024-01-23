import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report-period',
  templateUrl: './report-period.component.html',
  styleUrls: ['./report-period.component.css']
})
export class ReportPeriodComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  showMyContainer: boolean = false;
  email!:boolean;

  subscribe(){
    this.showMyContainer=!this.showMyContainer
  }

}
