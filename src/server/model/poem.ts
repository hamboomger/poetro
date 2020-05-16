import { Schema, model, Document } from 'mongoose';

const PoemSchema = new Schema({
  name: { type: String, required: false },
  author: { type: String, required: true },
  text: { type: String, required: true },
  targetTimeSec: { type: Number, required: true },
  tags: { type: [String], required: true },
}, {
  versionKey: false,
});

export interface IPoem extends Document {
  name: string;
  author: string;
  text: string;
  targetTimeSec: number;
  tags: string[];
}

const Poem = model<IPoem>('PoemSchema', PoemSchema);

export default Poem;
