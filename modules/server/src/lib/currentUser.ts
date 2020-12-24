import { Request } from 'express';
import { IUserDocument } from '../model/user';
import { logger } from './loggers';

const CURRENT_USER_PARAMETER = 'currentUser';

export function currentUserExists(req: Request): boolean {
  // @ts-ignore
  return req.appUser !== undefined;
}

export function getCurrentUser(req: Request): IUserDocument {
  // @ts-ignore
  const currentUser = req.appUser;
  if (currentUser === undefined) {
    throw Error('Failed to get current user from request');
  }
  return currentUser;
}

export function setCurrentUser(user: IUserDocument, req: Request) {
  // @ts-ignore
  req.appUser = user;
}
