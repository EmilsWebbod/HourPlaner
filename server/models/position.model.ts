
import * as mongoose from 'mongoose';
import {Handler} from '../utils/handler';
const Schema = mongoose.Schema;

export interface IPosition {
  icons: string;
  label: string;
  isRequired: boolean;
  isExpected: boolean;
}

const positionSchema = new Schema({
  label: {
    type: String,
    required: true,
  },
  icons: [{
    type: String,
    required: true,
    unique: true
  }],
  isRequired: {type: Boolean, default: false}
});

export const Position = mongoose.model<IPosition>('position', positionSchema);

function createModel(data: IPosition) {
  return new Position({
    icons: data.icons,
    label: data.label,
    isRequired: data.isRequired || false
  });
}

/** Will add only a position once. Will check if exist or add new and return position */
Position.addOnce = (data: IPosition): Promise<IPosition> => { return new Promise((res, rej) => {
  const label = data.label || '';
  Position.findOne({label: label}).exec().then(pos => {
    if (!pos) {
      Position.create(createModel(data)).then(res, rej);
    } else {
      res(pos);
    }
  }, Handler.modelError('Error while creating new Position'));
})};

Position.getList = () => Position.find({});
