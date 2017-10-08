
import {Branch, IBranchModel} from '../models/branch.model';
import {Handler} from '../utils/handler';
import {Position} from '../models/position.model';
import * as R from 'ramda';

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
    Branch.findOne({code: code}).populate('users positions groups.user').exec().then(branch => {
      if (!branch) { return res(Handler.error('No branch with code ' + code)); }
      res(Handler.success('Branch', branch));
    }, Handler.ctrlError(res)('Failed to get branch'))
  })}

  export function update(code: string, data: IBranchModel) { return new Promise(res => {
    let positionsProm = [];
    if (data.positions && data.positions.length > 0) {
      positionsProm = data.positions.map( Position.addOnce );
    }

    Promise.all(positionsProm).then(positions => {
      data.positions = positions.map(x => x._id);
      Branch.update(code, data).then(x => {
        res(Handler.success('Branch Updated', x));
      }, Handler.ctrlError(res)('Failed to update branch'));
    })
  })}
}
