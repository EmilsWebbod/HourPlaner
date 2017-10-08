import {Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {IUser} from '../../utils/interfaces';
import {stringHoursToNumber, timesHalfHour} from '../../utils/functional';
import {GridService, IExcel} from '../grid.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid-plan.component.html',
  styleUrls: ['./grid-plan.component.css']
})
export class GridPlanComponent implements OnInit, OnChanges {

  @Input() sections: Array<{start: string, end: string}> = [];
  @Input() rows: Array<IUser> = [];

  @Output() rowDeleted: EventEmitter<{i: number, d: any}> = new EventEmitter();

  /** Will be true if mouse hold down */
  mouseActive = false;
  /** Last key pressed on keyboard */
  activeKey = 'None';
  /** To not flow over to the other users */
  activeUser = -1;
  /** Used to Combine valid inputs So if a person should Clean H ( RH ) */
  SHIFT: boolean = false;

  moveUser = -1;

  _sectionsColumns: Array<Array<string>> = [];
  _data: Array<Array<string>> = [[]];


  @HostListener('window:keydown', ['$event']) keyDown($event) {
    if($event.key === 'Shift') {
      this.SHIFT = true;
    } else {
      if (this.SHIFT) {
        this.activeKey += $event.key.toUpperCase();
      } else {
        if ($event.key === 'Delete') {
          this.activeKey = '';
        } else {
          this.activeKey = $event.key.toUpperCase();
        }
      }
    }
  }

  @HostListener('window:keyup', ['$event']) keyUp($event) {
    if($event.key === 'Shift') {
      this.SHIFT = false;
    }
  }

  @HostListener('window:mousedown') mouseDown() {
    this.mouseActive = true;
  }

  @HostListener('window:mouseup') mouseUp() {
    this.mouseActive = false;
    this.activeUser = -1;
  }


  constructor(private _grid: GridService) {}

  ngOnInit() {
    this._data.length = 30;
    this._sectionsColumns = this.sections.map(section => {
      let arr = [];
      arr.length = stringHoursToNumber(2)(section.start)(section.end);
      for(let i = 0; i < arr.length; i++) {
        arr[i] = timesHalfHour(i)(section.start);
      }
      return arr;
    });
  }

  public ngOnChanges(changes: any): void {
    if(changes && changes.rows && changes.rows.length > 0) {
      if(this._data.length < changes.rows.length) {
        for(let i = 0; i < changes.rows.length; i++) {
          if (!this._data[i]) { this._data.push([]); }
        }
      }
    }
  }

  getData(i: number, ui: number, di: number) {
    if (!this._data[ui]) { this._data[ui] = []; }
    const dataIndex = +di * +(i+1);
    return this._data[ui][this._getDataIndex(i, di)];
  }

  /**
   *  Grid data clicked or hovered.
   *  Will update content after mouseEvent and KeyEvent
   *
   */
  dataChange(i: number, ui: number, di: number, $event: any) {
    if( $event === 'hover' && !this.mouseActive) {
      return;
    }
    if(this.activeUser === -1) { this.activeUser = ui; }
    this._data[this.activeUser][this._getDataIndex(i, di)] = this.activeKey;
  }

  switchUser(ui: number): void {
    if(this.moveUser === -1) {
      this.moveUser = ui;
    } else {
      const user = this.rows[this.moveUser];
      this.rows[this.moveUser] = this.rows[ui];
      this.rows[ui] = user;
      this.moveUser = -1;
    }
  }

  removeUser(ui, user) {
    this._data.splice(ui, 1);
    this.rowDeleted.emit({i: ui, d: user});
  }

  /**
   * Get the correct index to read and set data for grid
   * Takes length of colums and times it with shift and plus data index
   * */
  private _getDataIndex(i: number, di: number) {
    return (this._sectionsColumns[0].length * i) + di;
  }

  print() {

  }

  download() {
    const data: IExcel = {
      title: 'Empty Title',
      header: this._sectionsColumns.reduce((n, o) => n.concat(o), []),
      rowsTitle: this.rows.map(x => x.name),
      rows: this._data.filter(x => !!x)
    };
    this._grid.exportExcel(data).then(x => {
      console.log('excel', x);
    })
  }
}
