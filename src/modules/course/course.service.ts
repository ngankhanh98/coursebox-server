import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GetManyDefaultResponse } from '@nestjsx/crud';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { rejects } from 'assert';
import { resolve } from 'path';
import { generateId } from 'src/common/utils';
import { Course } from 'src/entities/course.entity';
import { User } from 'src/entities/user.entity';
import { createQueryBuilder } from 'typeorm';
import { updateCourseDto } from './dto/course.dto';

@Injectable()
export class CourseService extends TypeOrmCrudService<Course> {
  constructor(@InjectRepository(Course) repo) {
    super(repo);
  }

  createCourse(dto: updateCourseDto): Promise<Course> {
    // const course = new Course();
    // course.title = dto.title;
    // course.courseId = generateId(course.title + new Date().toUTCString()).slice(
    //   0,
    //   9,
    // );
    dto.courseId = generateId(dto.title + new Date().toUTCString()).slice(0, 9);
    // return this.repo.save(course);
    console.log('dto', dto);

    return this.repo.save(dto);
  }

  public async findCourseById(courseId: string) {
    const result = await this.repo.findOne({ courseId: courseId });

    if (!result) {
      throw new NotFoundException();
    }
    return result;
  }

  findByFilter(filters: any) {
    const keys = Object.keys(filters);
    const values = Object.values(filters);

    console.log('keys', keys);
    console.log('values', values);
    // FIXME: Can't find FULLTEXT index matching the column list
    const promises = keys.map(
      (key, index) =>
        new Promise(resolve => {
          Object.keys(this.repo.metadata.propertiesMap).includes(key)
            ? resolve(
                this.repo
                  .createQueryBuilder()
                  .select()
                  .where(
                    `MATCH (${key}) AGAINST ('${values[index]}' IN BOOLEAN MODE)`,
                  )
                  .getMany(),
              )
            : resolve(null);
        }),
    );

    return Promise.all(promises).then(value => {
      console.log(value);
      return value;
    });
  }

  // TODO: join 3 table: user, participant, course
  async findByTeacherName(fullname: string) {
    return;
  }

  async findAllCoursesWithTeacher(): Promise<Course | Course[]> {
    return new Promise(resolve => {
      resolve(
        this.repo
          .createQueryBuilder('course')
          .leftJoinAndSelect('course.teacher', 'user')
          .getMany(),
      );
    });
  }
  async findAllCoursesWithMembers(): Promise<Course | Course[]> {
    return new Promise(resolve => {
      resolve(
        this.repo
          .createQueryBuilder('course')
          .leftJoinAndSelect('course.users', 'user')
          .orderBy('course.createdAt', 'DESC')
          .getMany(),
      );
    });
  }

  async findAllCourses(): Promise<Course | Course[]> {
    return new Promise(resolve => {
      resolve(
        this.repo
          .createQueryBuilder('course')
          .leftJoinAndSelect('course.users', 'user')
          .leftJoinAndSelect('course.teacher', 'teacher')
          .getMany(),
      );
    });
  }
}
