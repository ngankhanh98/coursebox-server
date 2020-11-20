const crypto = require('crypto');

export function generateId(text:string){
  const hmac = crypto.createHmac('sha1', process.env.JWT_ID_SECRET);
  hmac.update(text);
  return hmac.digest('hex');
}

export function getUserId(username: string) {
  
}

export function generateCourseId(course_title: string) {
  const hmac = crypto.createHmac('sha1', process.env.JWT_ID_SECRET);
  hmac.update(course_title);
  return hmac.digest('hex');
}
