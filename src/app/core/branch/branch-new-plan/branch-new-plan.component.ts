import {Component, OnInit, ViewChild} from '@angular/core';
import {BranchService} from '../branch.service';
import {isArray} from 'util';
import {SelectorUserComponent} from '../../../shared/selector/selector-user/selector-user.component';

@Component({
  selector: 'app-branch-new-plan',
  templateUrl: './branch-new-plan.component.html',
  styleUrls: ['./branch-new-plan.component.css']
})
export class BranchNewPlanComponent implements OnInit {

  @ViewChild('userSelector') user_selector: SelectorUserComponent;
  users: Array<any> = [];

  constructor(public _branch: BranchService) { }

  ngOnInit() {}

  /** Add user to the users. push user or concat array */
  addUser(user: any | Array<any>) {
    if ( isArray(user) ) {
      this.users = this.users.concat(user);
    } else {
      this.users.push(user);
    }
  }

  /** Remove user from users list with index i and add the user back into the user_selector list */
  removeUser($event) {
    this.users.splice($event.i, 1);
    this.user_selector.insertUser($event.d);
  }
}
