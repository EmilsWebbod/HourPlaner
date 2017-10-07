
import {Injectable} from '@angular/core';
import {ServerService} from './server.service';
import {Behavior} from '../shared/utils/behavior';

@Injectable()
export class AppService {

  public branches = Behavior.of([]);

  constructor(private _server: ServerService) {}

  private get = url => this._server.get(url);
  private post = url => data => this._server.post(url)(data);

  public addBranch = (code: string, name: string) => this.post('/api/branch/add')({
    code: code,
    name: name
  });
  public getBranches = () => this.get('/api/branch/list');
  public getUsers = branch => this.get(`/api/user/users/${branch}`);
}
