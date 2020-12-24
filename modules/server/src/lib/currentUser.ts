import httpContext from 'express-http-context';
import { IUserDocument } from '../model/user';
import { logger } from './loggers';

const CURRENT_USER_PARAMETER = 'currentUser';

export function currentUserExists(): boolean {
  return httpContext.get(CURRENT_USER_PARAMETER) !== undefined;
}

export function getCurrentUser(): IUserDocument {
  const currentUser = httpContext.get(CURRENT_USER_PARAMETER);
  logger.info(`Getting http context variable: ${CURRENT_USER_PARAMETER} | ${JSON.stringify(currentUser, null, 2)}`);
  if (currentUser === undefined) {
    throw Error('Failed to fetch current user from context');
  }
  return currentUser;
}

export function setCurrentUser(user: IUserDocument) {
  httpContext.set(CURRENT_USER_PARAMETER, user);
  logger.info(`Http context variable got set: ${CURRENT_USER_PARAMETER} | ${JSON.stringify(user, null, 2)}`);
}
