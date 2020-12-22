import jwt from 'jsonwebtoken';

export interface JwtTokenPayload {
  userId: string,
}

function getJwtTokenSecretOrFail(): string {
  const webTokenSecret = process.env.WEB_TOKEN_SECRET;
  if (!webTokenSecret) {
    throw Error('WEB_TOKEN_SECRET variable does not exist. Did you create .env.local file with web token secret?');
  }
  return webTokenSecret;
}

export function createJwtToken(payload: JwtTokenPayload): string {
  return jwt.sign(payload, getJwtTokenSecretOrFail());
}

export function getTokenPayload(token: string): JwtTokenPayload | null {
  try {
    return jwt.verify(token, getJwtTokenSecretOrFail()) as JwtTokenPayload;
  } catch (err) {
    console.log(err);
    return null;
  }
}
