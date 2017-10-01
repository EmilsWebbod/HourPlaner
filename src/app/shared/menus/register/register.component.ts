import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from '../../../services/user.service';
import {BranchService} from '../../../core/branch/branch.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  role = 0;
  roles: any = [
    'EMPLOYEE',
    'LEADER',
    'BOSS'
  ];

  constructor(private _user: UserService,
              private _branch: BranchService) { }

  ngOnInit() {}

  register(form: NgForm) {
    const username = form.value.username;
    const password = form.value.password;
    const name = form.value.name;
    const role = form.value.role || 0;

    this._user.register(this._branch.branch, username, role, name, password).then(x => {
      console.log(x);
      if (x) {
        form.resetForm();
      }
    });
    return false;
  }
}
