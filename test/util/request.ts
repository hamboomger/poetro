import { Request as SuperagentRequest } from 'superagent';
import chai from 'chai';
import app from '../../src/server';
import { IUserDocument } from '../../src/server/model/user';

export const TEST_USER_HEADER_PARAMETER = 'testUserId';

function request(
  requestFun: (agent: ChaiHttp.Agent) => SuperagentRequest,
  authenticatedUser: IUserDocument = undefined,
): SuperagentRequest {
  let req = requestFun(chai.request(app));
  if (authenticatedUser) {
    req = req.set(TEST_USER_HEADER_PARAMETER, authenticatedUser.id.toString());
  }
  return req;
}

function get(url: string, authenticatedUser: IUserDocument = undefined): SuperagentRequest {
  return request(((agent) => agent.get(url)), authenticatedUser);
}

function post(url: string, authenticatedUser: IUserDocument = undefined): SuperagentRequest {
  return request(((agent) => agent.post(url)), authenticatedUser);
}

function put(url: string, authenticatedUser: IUserDocument = undefined): SuperagentRequest {
  return request(((agent) => agent.put(url)), authenticatedUser);
}

function deleteReq(url: string, authenticatedUser: IUserDocument = undefined): SuperagentRequest {
  return request(((agent) => agent.delete(url)), authenticatedUser);
}

export default {
  get, post, put, deleteReq,
};
