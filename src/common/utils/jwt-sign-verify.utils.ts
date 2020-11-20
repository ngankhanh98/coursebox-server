import jwt from 'jsonwebtoken';

export function sign(payload: object, secretkey: string) {
  return jwt.sign(payload, secretkey);
}

export function verify(token: string, secretkey: string) {
  return jwt.verify(token, secretkey) ?? false;
}
