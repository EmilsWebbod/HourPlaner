import { Component, OnInit } from '@angular/core';
import {EUSER_ROLES, UserService} from '../../../services/user.service';
import {BranchService} from '../branch.service';

@Component({
  selector: 'app-branch-users',
  templateUrl: './branch-users.component.html',
  styleUrls: ['./branch-users.component.css']
})
export class BranchUsersComponent implements OnInit {

  user_roles = EUSER_ROLES;

  constructor(public _branch: BranchService) { }

  ngOnInit() {}
}
