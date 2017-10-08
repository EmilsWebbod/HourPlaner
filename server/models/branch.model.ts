
import * as mongoose from 'mongoose';
import {Handler, MSG} from '../utils/handler';
const Schema = mongoose.Schema;

export interface IBranchModel {
  _id?: string;
  code: string;
  name: string;
  created?: Date;
  positions: Array<string | any>;
  open_hours: {open: string, close: string},
  shifts: Array<{start: string, end: string}>;
  groups: Array<Array<string>>;
  add(name: string): Promise<any>;
}

export interface IShift {
  start: string;
  end: string;
  users: Array<string>;
}

const branchModel = new Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    index: true,
    minLength: 3
  },
  name      : {type: String, default: 'No Name'},
  created   : {type: Date, default: Date.now()},
  positions : {type: [{type: Schema.Types.ObjectId, ref: 'position'}], default: []},
  open_hours: {type: {
    open:  {type: String},
    close: {type: String}
  }, default: {open: '09:00', close: '20:30'}},
  shifts     : {type: [ {
    start:  {type: String},
    end:    {type: String}
  }], default: [{start: '09:00', end: '14:30'}, {start: '15:00', end: '20:30'}]},
  groups:      {type: [{
    group: {type: Number},
    name: {type: String},
    user: {type: Schema.Types.ObjectId, ref: 'user'}
  }]},
  users       : {type: [{type: Schema.Types.ObjectId, ref: 'user'}], default: []}
});


export const Branch = mongoose.model<IBranchModel>('branch', branchModel);

function createModel(data: IBranchModel) {
  return new Branch({
    code: data.code,
    name: data.name || 'No Name'
  })
}

const duplicateName = errCode => errCode === 11000 ? MSG.D_branch_name : 'Unknown error';
Branch.add = (data: IBranchModel) => { return new Promise((res, rej) => {
  Branch.create(createModel(data)).then(res, err => {
    rej(Handler.modelError(duplicateName(err.code))(err))
  });
})};

Branch.list = () => {
  return Branch.find({}).exec();
};

Branch.update = (code: string, data: IBranchModel) => {
  return Branch.findOneAndUpdate({code: code}, data).exec();
};
