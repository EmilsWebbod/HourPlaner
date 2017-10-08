
import * as mongoose from 'mongoose';
import * as passportLocalMongoose from 'passport-local-mongoose';
import {Handler} from '../utils/handler';
import * as _ from 'ramda';

const Schema = mongoose.Schema;

export enum EUSER_STATE {
  EMPLOYEE = 0,
  LEADER = 1,
  BOSS = 2
}

export interface IUserModel {
  // Values
  _id?: string;
  username: string;
  created?: Date;
  branch: string;
  boss: number;
}

const userSchema = new Schema({
  username: {
    type: String,
    index: true,
    required: true,
    unique: true,
    minLength: 2,
    set: _.toLower
  },
  name: {type: String, default: 'No Name'},
  branch: {type: Schema.Types.ObjectId, ref: 'branch', required: true},
  positions: {type: [{type: Schema.Types.ObjectId, ref: 'position'}], default: []},
  state: {type: Number, default: 0},
  created: {type: Date, default: Date.now()}
});

userSchema.plugin(passportLocalMongoose, {
  attemptsField: true,
  lastLoginField: true,
  usernameLowerCase: true,
  /*limitAttempts: true,*/
  maxAttempts: 25
});

export const User = mongoose.model<IUserModel>('user', userSchema);

User.initUser = (data, branch) => new User({
  username: data.username,
  branch: branch,
  name: data.name || 'No name',
  state: data.role || 0,
  skills: data.skills || []
});

User.getUsers = branch => {
  return User.find({branch: branch}).exec();
};

User.test = function() {
  return new Promise((res, rej) => {
    rej( Handler.modelError('test')({test: 'test'}) );
  });
};
