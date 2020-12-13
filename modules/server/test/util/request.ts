import { Request as SuperagentRequest } from 'superagent';
import chai from 'chai';
import { IUserDocument } from '../../src/model/user';
import app from '../../src';

export const TEST_USER_HEADER_PARAMETER = 'testUserId';

function request(
  requestFun: (agent: ChaiHttp.Agent) => SuperagentRequest,
  authenticatedUser?: IUserDocument,
): SuperagentRequest {
  let req = requestFun(chai.request(app));
  if (authenticatedUser) {
    req = req.set(TEST_USER_HEADER_PARAMETER, authenticatedUser.id);
  }
  return req;
}

function get(url: string, authenticatedUser?: IUserDocument): SuperagentRequest {
  return request(((agent) => agent.get(url)), authenticatedUser);
}

function post(url: string, authenticatedUser?: IUserDocument): SuperagentRequest {
  return request(((agent) => agent.post(url)), authenticatedUser);
}

function put(url: string, authenticatedUser?: IUserDocument): SuperagentRequest {
  return request(((agent) => agent.put(url)), authenticatedUser);
}

function deleteReq(url: string, authenticatedUser?: IUserDocument): SuperagentRequest {
  return request(((agent) => agent.delete(url)), authenticatedUser);
}

export default {
  get, post, put, deleteReq,
};
