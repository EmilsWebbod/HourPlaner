import { Component, OnInit } from '@angular/core';
import {EUSER_ROLES, UserService} from '../../../services/user.service';

@Component({
  selector: 'app-branch-users',
  templateUrl: './branch-users.component.html',
  styleUrls: ['./branch-users.component.css']
})
export class BranchUsersComponent implements OnInit {

  users: Array<any> = [];
  user_roles = EUSER_ROLES;

  constructor(private _users: UserService) { }

  ngOnInit() {
    this._users.getUsers('611').then(x => this.users = x);
  }
}
