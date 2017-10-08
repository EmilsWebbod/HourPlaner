import * as R from 'ramda';

export const _id = (obj: any): string => obj._id;
export const getUserId = (obj: any): string => obj.user._id;


export const notInList = (list: Array<any>) => (user: any): boolean => {
  console.log('list', list, user);
  return list.findIndex(R.compose(R.equals(_id(user)) ,getUserId)) === -1;
};

export const groupTo2D = (n: Array<any>, o: any): Array<any> => {
  if (typeof n[o.group] === 'undefined') {
    n[o.group] = [];
  }
  n[o.group].push(o.user);
  return n;
};

/**
 * Takes two strings hh:mm and counts how may 30min (Multiply = 2) between them and returns number
 * @param {number} multiply
 */
export const stringHoursToNumber = (multiply: number) => (from: string) => (to: string): number => {
  const _from: Array<number> = from.split(':').map(Number);
  const _to: Array<number> = to.split(':').map(Number);

  let _hours: number = ((_to[0] - _from[0]) * multiply) + (multiply - 1);
  const _minutes: number = (_from[1] - _to[1]);

  if(_minutes > 0) {_hours--;}
  if(_minutes < 0) {_hours++;}

  return _hours;
};

/**
 * Takes a hour string hh:mm and multiplies the time value of 30minutes
 * Hour: 09:00 Times: 3 -> 10:30
 */
export const timesHalfHour = (times: number) => (hour: string): string => {
  /** Don't want to divide with 0. And will return the same value anyway */
  if (times === 0) { return hour; }
  const _hour = hour.split(':').map(Number);

  if (times % 2 !== 0) {
    _hour[1]++;
    times--;
  }
  _hour[0] += (times/2);

  return `${_hour[0]}:${_hour[1] > 0 ? '30' : '00'}`;
};
