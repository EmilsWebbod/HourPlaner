
import {Branch, IBranchModel} from '../models/branch.model';
import {Handler} from '../utils/handler';

export namespace BranchCtrl {

  export function add(data: IBranchModel) { return new Promise(res => {
    if (!data.name) { return res(Handler.input('Need name to add Branch')); }
    Branch.add(data).then(x => {
      res(Handler.success('Branch added'));
    }, Handler.ctrlModelError(res));
  })}

  export function list() { return new Promise(res => {
    Branch.list().then(x => {
      res(Handler.success('Branch list', x));
    }, Handler.ctrlError(res)('Failed to get branch list'))
  })}
}
