
import {EUSER_STATE} from './enums';

export interface IUser {
  username: string;
  name: string;
  branch: string;
  state: EUSER_STATE;
  created?: Date;
}

export interface IPosition {
  icons: string;
  label: string;
  isRequired: boolean;
}

export interface IBranch {
  _id?: string;
  code: string;
  name: string;
  created?: Date;
  positions: Array<string | IPosition>;
  open_hours: {open: string, close: string},
  shifts: Array<{start: string, end: string}>;
  groups: Array<Array<string | any>>;
}
