// Teacher's id: jwt.sign({username, role: 'teacher'}, se)
// Member's id: jwt.sign({username, role: 'member'}, se)
// Course's id: jwt.sign({course_name, year, teacher_id}, se)
import { encode } from './jwt-endcode-decode.utils';

export function getUserId(username: string, role) {
  const payload = { username: username, role: role };
  return encode(payload, process.env.JWT_ID_SECRET);
}

export function generateCourseId(course_title: string, teacher_id: string) {
  const payload = {
    title: course_title,
    timestamp: new Date().toISOString(),
    teacher_id: teacher_id,
  };
  return encode(payload, process.env.JWT_ID_SECRET);
}
