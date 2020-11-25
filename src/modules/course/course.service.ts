import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { resolve } from 'path';
import { generateId } from 'src/common/utils';
import { DatabaseModule } from 'src/database/database.module';
import { Course } from 'src/entities/course.entity';
import { Participant } from 'src/entities/participant.entity';
import { User } from 'src/entities/user.entity';
import { UserService } from '../user/user.service';
import { updateCourseDto } from './dto/course.dto';

@Injectable()
export class CourseService extends TypeOrmCrudService<Course> {
  constructor(
    @InjectRepository(Course) repo,
  ) {
    super(repo);
  }

  createCourse(dto: updateCourseDto): Promise<Course> {
    const course = new Course();
    course.title = dto.title;
    course.courseId = generateId(course.title + new Date().toUTCString()).slice(
      0,
      9,
    );
    return this.repo.save(course);
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
}
