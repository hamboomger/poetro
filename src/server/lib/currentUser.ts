import httpContext from 'express-http-context';
import { IUserDocument } from '../model/user';

const CURRENT_USER_PARAMETER = 'currentUser';

export function getCurrentUser(): IUserDocument | undefined {
  return httpContext.get(CURRENT_USER_PARAMETER);
}

export function setCurrentUser(user: IUserDocument) {
  httpContext.set(CURRENT_USER_PARAMETER, user);
}
