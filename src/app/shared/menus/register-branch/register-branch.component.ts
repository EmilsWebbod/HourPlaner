import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AppService} from '../../../services/app.service';
import * as _ from 'ramda';

@Component({
  selector: 'app-register-branch',
  templateUrl: './register-branch.component.html',
  styleUrls: ['./register-branch.component.css']
})
export class RegisterBranchComponent implements OnInit {

  constructor(private _app: AppService) { }

  ngOnInit() {
  }

  registerBranch(form: NgForm) {
    const code = form.value.code;
    const name = form.value.name;
    this._app.addBranch(code, name).then(x => {
      if (x) {
        form.resetForm();
        this._app.branches.map(_.append(x));
      }
    })
  }
}
