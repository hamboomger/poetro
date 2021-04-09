import { Request } from 'express';
import { UserModel } from '../../models/user';

export function currentUserExists(req: Request): boolean {
  return req.user !== undefined;
}

export function getCurrentUser(req: Request): UserModel {
  const currentUser = req.user;
  if (currentUser === undefined) {
    throw Error('Failed to get current user from request');
  }
  return currentUser;
}

export function setCurrentUser(user: UserModel, req: Request) {
  req.user = user;
}
