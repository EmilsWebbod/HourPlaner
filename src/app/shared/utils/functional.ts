import * as R from 'ramda';

export const _id = obj => obj._id;
export const getUserId = obj => obj.user._id;


export const notInList = (list: Array<any>) => (user: any) => {
  console.log('list', list, user);
  return list.findIndex(R.compose(R.equals(_id(user)) ,getUserId)) === -1;
};
