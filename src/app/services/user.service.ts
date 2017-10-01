import { Injectable } from '@angular/core';
import {ServerService} from './server.service';

export enum EUSER_ROLES {
  'EMPLOYEE' = 0,
  'LEADER',
  'BOSS'
}

@Injectable()
export class UserService {

  private _url = '/api/user/';

  constructor(private _server: ServerService) { }

  private get = (url: string) => this._server.get(`${this._url}${url}`);
  private post = (url: string) => (data: any) => this._server.post(`${this._url}${url}`)(data);

  public register(branch: string, username: string, role: string, name = '', password = '') {
    console.log(branch);
    return this.post('register')({
      branch: branch,
      username: username,
      role: role,
      name: name,
      password: password
    });
  }

  public login(username: string, password: string): Promise<any> {
    return this.post('login')({username: username, password: password});
  }

  public logout() {
    return this.get('logout');
  }

  public getUsers(branch: string) {
    return this.get(`users/${branch}`);
  }
}
