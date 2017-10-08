import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgForm} from '@angular/forms';
import {MdChipInputEvent} from '@angular/material';
import {ENTER} from '@angular/cdk/keycodes';

@Component({
  selector: 'app-input-position',
  templateUrl: './input-position.component.html',
  styleUrls: ['./input-position.component.css']
})
export class InputPositionComponent implements OnInit {

  @Input() positions: Array<any> = [];
  @Output() positionsChange = new EventEmitter();

  noIcons = false;
  separatorKeysCodes = [ENTER, 188];
  edit = false;
  position = {
    icons: [],
    label: '',
    isRequired: false,
    isExpected: false,
    i: 0
  };

  constructor() { }

  ngOnInit() {
  }

  addPosition(form: NgForm) {
    if (this.position.icons.length === 0) {
      this.noIcons = true;
      return;
    }
    this.position.label = form.value.label;
    this.position.isRequired = form.value.isRequired;
    this.position.isExpected = form.value.isExpected;
    if ( this.edit ) {
      this.positions[this.position.i] = this.position;
      this.edit = false;
    } else {
      this.positions.push(this.position);
    }
    this.reset(form);
    this.update();
  }

  private update() {
    this.positionsChange.emit(this.positions);
  }

  private reset(form: NgForm) {
    this.noIcons = false;
    form.resetForm();
    this.position = {
      icons: [],
      label: '',
      isRequired: false,
      isExpected: false,
      i: 0
    };
  }

  deletePos(position: any, i: number) {
    if (confirm(`Delete ${position.icon} - ${position.label}?`)) {
      this.positions.splice(i, 1);
      this.update();
    }
  }

  editPos(position: any, i: number) {
    this.edit = true;
    position.i = i;
    this.position = position;
  }

  add(event: MdChipInputEvent): void {
    let input = event.input;
    let value = event.value;

    // Add our person
    if ((value || '').trim()) {
      this.position.icons.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(i) {
    this.position.icons.splice(i, 1);
  }
}
