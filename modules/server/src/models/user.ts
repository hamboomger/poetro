import {
  Document, model, Schema,
} from 'mongoose';

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

export interface CreateUser extends BaseUser { }

export interface UserModel extends BaseUser {
  id: string;
}

export interface IUserDocument extends Document, UserModel {
  _id: string,
}

const User = model<IUserDocument>('UserSchema', UserSchema);

export default User;
