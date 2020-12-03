import httpContext from 'express-http-context';
import { IUserDocument } from '../model/user';

const CURRENT_USER_PARAMETER = 'currentUser';

export function currentUserExists(): boolean {
  return httpContext.get(CURRENT_USER_PARAMETER) !== undefined;
}

export function getCurrentUser(): IUserDocument {
  const currentUser = httpContext.get(CURRENT_USER_PARAMETER);
  if (currentUser === undefined) {
    throw Error('Failed to fetch current user from context');
  }
  return currentUser;
}

export function setCurrentUser(user: IUserDocument) {
  httpContext.set(CURRENT_USER_PARAMETER, user);
}
