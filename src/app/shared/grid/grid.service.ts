
import {Injectable} from '@angular/core';
import {ServerService} from '../../services/server.service';

export interface IExcel {
  title: string;
  header: Array<string>; /** Header of Excel */
  rowsTitle: Array<string>; // Usually name of employee
  rows: Array<Array<string>>
}

@Injectable()
export class GridService {

  constructor(private _server: ServerService) {}

  exportExcel(data: IExcel) {
    return this._server.getFile('/api/files/exportExcel')(data);
  }
}
