import jwt from 'jsonwebtoken';

export function encode(payload: object, secretkey: string) {
  return jwt.sign(payload, secretkey);
}

export function decode(token: string, secretkey: string) {
  return jwt.verify(token, secretkey) ?? false;
}
