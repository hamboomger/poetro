import jwt from 'jsonwebtoken';

export interface JwtTokenPayload {
  userId: string,
}

export function createJwtToken(payload: JwtTokenPayload): string {
  return jwt.sign(payload, process.env.WEB_TOKEN_SECRET);
}

export function getTokenPayload(token: string): JwtTokenPayload | null {
  try {
    return jwt.verify(token, process.env.WEB_TOKEN_SECRET) as JwtTokenPayload;
  } catch (err) {
    console.log(err);
    return null;
  }
}
