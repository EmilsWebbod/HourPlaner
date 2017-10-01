import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {BranchService} from './branch.service';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css']
})
export class BranchComponent implements OnInit {

  private paramSub: Subscription;
  constructor(private _route: ActivatedRoute, private _branch: BranchService) { }

  ngOnInit() {
    this.paramSub = this._route.params.subscribe(params => {
      const branch = params['branch'];
      this._branch.branch = branch;
    })
  }
}
