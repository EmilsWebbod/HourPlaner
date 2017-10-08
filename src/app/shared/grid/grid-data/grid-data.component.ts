import {Component, EventEmitter, HostBinding, HostListener, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-grid-data',
  templateUrl: './grid-data.component.html',
  styleUrls: ['./grid-data.component.css']
})
export class GridDataComponent implements OnInit {

  @Input() defaultValue = '';
  @Input() value = '';
  @Input() activeKey = '';
  @Output() dataChange = new EventEmitter();

  _hover = false;

  @HostBinding('attr.disabled') @Input() disabled = false;
  @HostListener('mouseover') onHover() {
    this._hover = true;
    this.dataChange.emit('hover');
  }

  @HostListener('mouseout') onOut() {
    this._hover = false;
  }

  @HostListener('click') onClick() {
    this.dataChange.emit('click');
  }

  constructor() { }

  ngOnInit() {
    this.value = this.defaultValue;
  }

}
