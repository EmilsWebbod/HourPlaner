import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-input-shift',
  templateUrl: './input-shift.component.html',
  styleUrls: ['./input-shift.component.css']
})
export class InputShiftComponent implements OnInit {

  @Input() shifts: Array<any> = [];
  @Output() shiftsChange = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  add() {
    this.shifts.push({start: '00:00', end: '01:00'});
    this.update();
  }

  splice(i) {
    this.shifts.splice(i, 1);
    this.update();
  }

  update() {
    this.shiftsChange.emit(this.shifts);
  }
}
