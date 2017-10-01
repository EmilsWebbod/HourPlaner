

import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class BranchService {

  private _branch = new BehaviorSubject<string>('');
  public branch$ = this._branch.asObservable();

  constructor() {}

  get branch() { return this._branch.getValue(); }
  set branch(set) { this._branch.next(set); }
}
