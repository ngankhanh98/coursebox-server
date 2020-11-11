# Coursebox

Find your next favorite course on Coursebox

## ⚒ Stack

NestJS + mySQL


## 📐 ERD Diagram

![](https://github.com/ngankhanh98/coursebox-server/blob/main/docs/erd.v0.1.png?raw=true)

- Teachers:
**A teacher** might have **n courses**.

- Courses:
**A course** is belong to **1 teacher**, have **n chapters**, classified to **n tags**
- Members:
**A member** can join **0..n courses**

## ❄ API endpoint
### Teacher
- GET - /teachers
- GET - /teachers/{teacher_id}
- GET - /teachers/me
- POST - /teachers
- PUT - /teachers/{teacher_id}
- PATCH - /teachers/{teacher_id}
- DELETE - /teachers/{teacher_id}
- GET - /teachers/search?{title(course), tag, fullname}
### Course
- GET - /courses
- GET - /courses/{course_id}
- GET - /courses/search?{fullname(teacher), tag}
- POST - /courses
- PUT - /courses/{course_id}
- PATCH - /courses/{course_id}
- DELETE - /courses/{course_id}

### Member

- GET - /members
- GET - /members/me
- GET - /members/{member_id}
- GET - /members/search?{fullname}
- POST - /members
- PUT - /members/{member_id}
- PATCH - /members/{member_id}
- DELETE - /members/{member_id}