import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Output() optionSelected = new EventEmitter<number>();
  @Output() status = new EventEmitter<boolean>();

  state: boolean = true;
  ngOnInit(): void {
  }

  selectedOption(e: any) {
    this.optionSelected.emit(e.target.value)
  }

  clickEvent() {
    this.status.emit(!this.state);
    this.state = !this.state
  }
}
