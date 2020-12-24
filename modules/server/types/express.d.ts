import { IUserDocument } from '../src/model/user';

declare global {
  namespace Express {
    export interface Request {
      appUser: IUserDocument | undefined;
    }
  }
}
