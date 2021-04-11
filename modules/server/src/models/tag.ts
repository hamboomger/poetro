import { Document, model, Schema } from 'mongoose';

const TagSchema = new Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  color: { type: String, required: false },
});

export interface TagModel {
  userId: string
  name: string
  color?: string
}

export interface ITagDocument extends TagModel, Document {}

export const Tag = model<ITagDocument>('TagSchema', TagSchema);
