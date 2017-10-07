import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {BranchService} from './branch.service';
import {AppService} from '../../services/app.service';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css']
})
export class BranchComponent implements OnInit, OnDestroy {

  private paramSub: Subscription;
  constructor(private _route: ActivatedRoute,
              public _branch: BranchService,
              public _app: AppService
  ) { }

  ngOnInit() {
    this.paramSub = this._route.params.subscribe(params => {
      const branch = params['branch'];
      this._branch.getBranch(branch).then(x => {
        if (x) {
          this._branch.branch.prop = x;
          this._app.getUsers(x.code).then(users => {
            this._branch.users.prop = users || [];
          })
        }
      });
    });
  }

  ngOnDestroy() {
    if (this.paramSub) { this.paramSub.unsubscribe(); }
  }
}
