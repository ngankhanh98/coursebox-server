## ✏ Specification
This system create a network encourage people to learn and teach delibratedly.

As a guess, you can:
- [ ] S1.1. view courses (title, teacher, description, syllabus, tags)
- [ ] S1.2. view users' profiles

As a user, you are required to register with a unique username and password. You can:
- [ ] S2.1. register
- [ ] S2.2. login
- [ ] S2.3. view your information
- [ ] S2.4. update your information
- [ ] S2.5. enroll courses
- [ ] S2.6. create courses
- [ ] S2.7. deactive your account
- [ ] S2.8. search course (by name, tags, teacher)
- [ ] S2.9. search user (by role, username)

As a member of a course, you are required to enroll in the course. You can:
- [ ] S3.1. view participants in course.
- [ ] S3.2. unenroll from courses.
- [ ] S3.3. view your course (... as a guess, chapter)

As a teacher of a course, you are required to create a course. You can:
- [ ] S4.1. CRUD tags for his course
- [ ] S4.2. close course
- [ ] S4.3. reject members from course
- [ ] S4.4. CRUD course
- [ ] S4.5. CRUD chapter

## ❄ API endpoint


### Course

- [x] GET - /courses (S1.1)
- [x] GET - /courses/{courseId} (S1.1, S3.3)
- [ ] GET - /courses/search?{name, tags, teacher} (S2.8)
- [x] POST - /courses (S2.6)
- [x] PUT - /courses/{courseId} (S4.4)
- [x] PATCH - /courses/{courseId} (S4.4)
- [x] DELETE - /courses/{courseId} (S4.2)
- [ ] POST - /course/edit-tag (S4.1)
### User
- GET - /users/me (S2.3)
- GET - /users/{S1.2}
- GET - /users/search?{role, username} (S2.9)
- PUT - /users/{userId} (S2.4)
- PATCH - /users/{userId} (S2.4)
- DELETE - /users/{member_id} (S2.7)
- POST - /user/unenroll (S3.2) (attach db.[role])
### Auth
- POST - /auth/register (S2.1)
- POST - /auth/login (S2.2.)

### Participant
- GET - /participant/{courseId} (S3.1)
- DELETE - /participant/{courseId}/{username/userId} (S4.3)

### Chapter
- GET - /course/chapter/{chapterId} (S4.5)
- POST - /course/chapter/{chapterId} (S4.5)
- PUT - /course/chapter/{chapterId} (S4.5)
- PATCH - /course/chapter/{chapterId} (S4.5)
- DELETE - /course/chapter/{chapterId} (S4.5)

## Module breakdown
### CourseModule 
- [ ] Controller
- [ ] Service (CRUD Course)
### UserModule
- [ ] Controller
- [ ] Service (CRUD User, createToken,...)
### AuthModule
- [ ] Controller 
- [ ] Service
### ParticipantModule
- [ ] Controller
- [ ] Service (CRUD Participant)
### ChapterMdule
- [ ] Service (CRUD chapter)