import { Request as SuperagentRequest } from 'superagent';
import chai from 'chai';
import app from '../../src';

export const TEST_USER_HEADER_PARAMETER = 'testUserId';

function request(
  requestFun: (agent: ChaiHttp.Agent) => SuperagentRequest,
  userId?: string,
): SuperagentRequest {
  let req = requestFun(chai.request(app));
  if (userId) {
    req = req.set(TEST_USER_HEADER_PARAMETER, userId);
  }
  return req;
}

function get(url: string, userId?: string): SuperagentRequest {
  return request(((agent) => agent.get(url)), userId);
}

function post(url: string, userId?: string): SuperagentRequest {
  return request(((agent) => agent.post(url)), userId);
}

function put(url: string, userId?: string): SuperagentRequest {
  return request(((agent) => agent.put(url)), userId);
}

function deleteReq(url: string, userId?: string): SuperagentRequest {
  return request(((agent) => agent.delete(url)), userId);
}

export default {
  get, post, put, deleteReq,
};
