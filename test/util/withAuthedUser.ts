import { Request as SuperagentRequest } from 'superagent';

export const TEST_USER_HEADER_PARAMETER = 'testUser';

function withAuthedUser(user: any, request: SuperagentRequest): SuperagentRequest {
  if (request.get(TEST_USER_HEADER_PARAMETER)) {
    throw new Error(`'${TEST_USER_HEADER_PARAMETER}' header parameter is already in use`);
  }

  request.set(TEST_USER_HEADER_PARAMETER, user);
  return this;
}

export default withAuthedUser;
