import {
  Document, model, Schema, Types,
} from 'mongoose';

const TagSchema = new Schema({
  user: { type: Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  color: { type: String, required: false },
});

export interface ITagNoRefs {
  name: string;
  color?: string;
}

export interface ITag extends ITagNoRefs {
  user: Types.ObjectId,
}

export interface ITagDocument extends ITag, Document {}

export const Tag = model<ITagDocument>('TagSchema', TagSchema);
