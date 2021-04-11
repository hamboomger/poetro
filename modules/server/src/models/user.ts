import {
  Document, model, Schema,
} from 'mongoose';
import { Required } from 'utility-types';

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  passwordHash: { type: String, required: false },
  googleId: { type: String, required: false },
}, {
  versionKey: false,
});

interface BaseUser {
  name: string;
  email: string;
  passwordHash?: string;
  googleId?: string;
}

// user should have either passwordHash or googleId
export type CreateUser = Required<BaseUser, 'passwordHash'> | Required<BaseUser, 'googleId'>;

export interface UserModel extends BaseUser {
  id: string;
}

export interface IUserDocument extends Document, UserModel {
  _id: string,
}

const User = model<IUserDocument>('UserSchema', UserSchema);

export default User;
