import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import {isString} from 'util';
import {groupTo2D} from '../../utils/functional';

@Component({
  selector: 'app-selector-user',
  templateUrl: './selector-user.component.html',
  styleUrls: ['./selector-user.component.css']
})
export class SelectorUserComponent implements OnInit {

  @Input() users: Array<any> = [];
  @Input() groups: Array<any> = [];
  _groups: Array<any> = [];

  @Output() addUser = new EventEmitter();

  userControl: FormControl = new FormControl();
  filteredUsers: Observable<any[]>;

  constructor() {}

  ngOnInit() {
    this.resetFilter();
    this._groups = this.groups.reduce(groupTo2D, [])
  }

  public insertUser(user: any) {
    this.users.push(user);
  }

  /** Filter search by checking if search is part of username or name of the user */
  private filter(val: string): string[] {
    if ( !isString(val) ) { return []; }
    val = val.toLowerCase();
    return this.users.filter(user => {
      const un = user.username.toLowerCase().indexOf(val);
      const n = user.name.toLowerCase().indexOf(val);
      if ( un > -1 ) {return true;}
      return  n > -1;
    })
  }

  reset(user) {
    return '';
  }

  select($event) {
    const user = $event.option.value;
    const i = this.users.findIndex(x => x.username === user.username);
    if(i !== -1) { this.users.splice(i, 1); }
    this.addUser.emit(user);
  }

  getLeader(group) {
    const leader = group.find(x => x.state === 1);
    return leader ? leader.name || 'No LeaderName' : 'No Leader';
  }

  addGroup(group: Array<any>, i: number) {
    this.users = this.users.filter(x => {
      let add = true;
      group.forEach(y => {
        if (y.username === x.username) {
          add = false;
        }
      });
      return add;
    });
    this.resetFilter();
    this._groups.splice(i, 1);
    this.addUser.emit(group);
  }

  public resetFilter() {
    this.filteredUsers = this.userControl.valueChanges
      .startWith(null)
      .map(val => val ? this.filter(val) : this.users.slice());
  }
}
