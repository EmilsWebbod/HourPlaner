
import {Injectable} from '@angular/core';
import {ServerService} from './server.service';

@Injectable()
export class AppService {

  constructor(private _server: ServerService) {}

  private get = url => this._server.get(url);
  private post = url => data => this._server.post(url)(data);

  public getBranches = () => this.get('/api/branch/list');
  public getUsers = branch => this.get(`/api/users/${branch}`);
}
