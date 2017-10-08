

import {Injectable} from '@angular/core';
import {Behavior} from '../../shared/utils/behavior';
import {ServerService} from '../../services/server.service';
import {IUser, IBranch} from '../../shared/utils/interfaces';

@Injectable()
export class BranchService {

  private _url = '/api/branch/';
  public branch: Behavior<IBranch> = Behavior.of(null);
  public users: Behavior<IUser> = Behavior.of([]);

  constructor(private _server: ServerService) {}

  private get = url => this._server.get(`${this._url}${url}`);
  private post = url => data => this._server.post(`${this._url}${url}`)(data);

  public getBranch(code: string) {
    return this.get(`get/${code}`);
  }

  public update(code: string, data: any) {
    return this.post(`update/${code}`)(data);
  }

  public updateBranch() {
    const branch = this.branch.prop;
    return this.post(`update/${branch.code}`)(branch);
  }
}
