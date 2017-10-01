
import * as mongoose from 'mongoose';
import {Handler, MSG} from '../utils/handler';
const Schema = mongoose.Schema;

export interface IBranchModel {
  _id?: string;
  name: string;
  created?: Date;
  add(name: string): Promise<any>;
}

const branchModel = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    index: true,
    minLength: 3
  },
  created: {type: Date, default: Date.now()},
  skills: {type: [{type: String}], default: []}
});

export const Branch = mongoose.model<IBranchModel>('branch', branchModel);

function createModel(data: IBranchModel) {
  return new Branch({
    name: data.name
  })
}

const duplicateName = errCode => errCode === 11000 ? MSG.D_branch_name : 'Unknown error';
Branch.add = (data: IBranchModel) => { return new Promise((res, rej) => {
  Branch.create(createModel(data)).then(res, err => {
    rej(Handler.modelError(duplicateName(err.code))(err))
  });
})};

Branch.list = () => Branch.find({}).exec();
