const crypto = require('crypto');

export function generateId(text:string){
  const hmac = crypto.createHmac('sha1', process.env.JWT_ID_SECRET);
  hmac.update(text);
  return hmac.digest('hex');
}