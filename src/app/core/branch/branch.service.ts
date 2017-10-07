

import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Behavior} from '../../shared/utils/behavior';
import {ServerService} from '../../services/server.service';

@Injectable()
export class BranchService {

  private _url = '/api/branch/';
  public branch = Behavior.of(null);
  public users = Behavior.of([]);

  constructor(private _server: ServerService) {}

  private get = url => this._server.get(`${this._url}${url}`);
  private post = url => data => this._server.post(`${this._url}${url}`)(data);

  public getBranch(code: string) {
    return this.get(`get/${code}`);
  }

  public update(code: string, data: any) {
    return this.post(`update/${code}`)(data);
  }
}
