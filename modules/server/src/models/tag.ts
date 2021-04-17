import { Document, model, Schema } from 'mongoose';
import { Optional } from 'utility-types';

const TagSchema = new Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  color: { type: String, required: false },
}, {
  versionKey: false,
});

interface BaseTag {
  userId: string
  name: string
  color?: string
}

export interface CreateTag extends BaseTag {}

export interface UpdateTag extends Optional<Omit<BaseTag, 'userId'>> {}

export interface TagModel extends BaseTag {
  id: string
}

export interface ITagDocument extends TagModel, Document {}

export const Tag = model<ITagDocument>('TagSchema', TagSchema);
