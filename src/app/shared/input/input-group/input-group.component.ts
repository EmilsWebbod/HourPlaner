import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {notInList} from '../../utils/functional';

@Component({
  selector: 'app-input-group',
  templateUrl: './input-group.component.html',
  styleUrls: ['./input-group.component.css']
})
export class InputGroupComponent implements OnInit {

  /** Input of the users that could join a group. This Needs to be the User Object */
  @Input() users: Array<any> = [];

  /** Array of the grouped users */
  @Input() groups: Array<any> = [];
  @Input() groupsChange = new EventEmitter();

  /**
   * We don't mess with the input variable when checking if the users is in a group or not.
   * _users will be updated if @Input() users is updated or if any users join or leaves a group.
   *
   */
  _groupNames: Array<string> = [];
  _groups: Array<Array<any>>;
  _users: Array<any>;

  _deletedGroup: any;
  _deletedUser: {i: number; user: any};

  constructor() {}

  ngOnInit() {
    /** Copy array. Will not want to update Input since we can hard reset with that */
    if (this.users && this.users.length > 0) {
      this._users = this.users.filter(notInList(this.groups));
    }
    this._groups = this.groups.reduce((n, o) => {
      if (typeof n[o.group] === 'undefined') {
        n[o.group] = [];
        this._groupNames[o.group] = o.name || 'Group';
      }
      n[o.group].push(o.user);
      return n;
    }, []);
  }

  addGroup() {
    this._groupNames.push('Group');
    this._groups.push([]);
    this.update();
  }

  removeGroup(i: number) {
    console.log(i);
    this._deletedGroup = this._groups.splice(i, 1);
    this._groupNames.splice(i, 1);
    console.log(this._groups);
    this.update();
  }

  addUser(i: number, user: any) {
    this.groups.push({group: i, user: user});
    this._groups[i].push(user);
    this._users = this._users.filter(x => x._id !== user._id);
    this.update();
  }

  removeUser(group: Array<any>, i: number) {
    const user = group.splice(i, 1)[0];
    this._deletedUser = {i: i, user: user};
    this._users.push(user);
    const index = this.groups.findIndex(x => x.user._id === user._id);
    if (index > -1) { this.groups.splice(index, 1); }
    this.update();
  }

  private update() {
    this.groupsChange.emit(this.groups);
  }
}
