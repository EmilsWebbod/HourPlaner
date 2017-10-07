
import {Branch, IBranchModel} from '../models/branch.model';
import {Handler} from '../utils/handler';

export namespace BranchCtrl {

  export function add(data: IBranchModel) { return new Promise(res => {
    if (!data.name) { return res(Handler.input('Need name to add Branch')); }
    Branch.add(data).then(x => {
      res(Handler.success('Branch added', x));
    }, Handler.ctrlModelError(res));
  })}

  export function list() { return new Promise(res => {
    Branch.list().then(x => {
      res(Handler.success('Branch list', x));
    }, Handler.ctrlError(res)('Failed to get branch list'))
  })}

  export function get(code: string) { return new Promise(res => {
    Branch.findOne({code: code}).populate('users groups.user').exec().then(branch => {
      if (!branch) { return res(Handler.error('No branch with code ' + code)); }
      res(Handler.success('Branch', branch));
    }, Handler.ctrlError(res)('Failed to get branch'))
  })}

  export function update(code: string, data: IBranchModel) { return new Promise(res => {
    Branch.update(code, data).then(x => {
      res(Handler.success('Branch Updated', x));
    }, Handler.ctrlError(res)('Failed to update branch'));
  })}
}
