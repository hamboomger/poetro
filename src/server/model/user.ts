import { Document, model, Schema } from 'mongoose';

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  passwordHash: { type: String, required: true },
}, {
  versionKey: false,
});

export interface IUser {
  name: string;
  email: string;
  passwordHash: string;
}

export interface IUserDocument extends Document, IUser {
  verifyPassword(password: string): boolean,
}

const User = model<IUserDocument>('UserSchema', UserSchema);

export default User;
