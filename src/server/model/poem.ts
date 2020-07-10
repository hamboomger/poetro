import {
  Document, model, Schema, Types,
} from 'mongoose';
import { IUserDocument } from './user';

const PoemSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: false },
  author: { type: String, required: true },
  text: { type: String, required: true },
  targetTimeSec: { type: Number, required: true },
  tags: { type: [String], required: true },
}, {
  versionKey: false,
});

export interface IPoem {
  user: Types.ObjectId | IUserDocument,
  name?: string;
  author: string;
  text: string;
  targetTimeSec: number;
  tags: string[];
}

export interface IPoemDocument extends IPoem, Document {
}

const Poem = model<IPoemDocument>('PoemSchema', PoemSchema);

export default Poem;
