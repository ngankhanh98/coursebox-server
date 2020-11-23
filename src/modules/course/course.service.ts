import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { generateId } from 'src/common/utils';
import { Course } from 'src/entities/course.entity';
import { updateCourseDto } from './dto/course.dto';

@Injectable()
export class CourseService extends TypeOrmCrudService<Course> {
  constructor(@InjectRepository(Course) repo) {
    super(repo);
  }

  createCourse(dto: updateCourseDto): Promise<Course> {
    const course = new Course();
    course.title = dto.title;
    course.courseId = generateId(course.title + new Date().toUTCString());

    // const timestamp = new Date().toUTCString();
    // const courseId = generateId(`${dto.title}-${timestamp}`);
    // const course = { ...dto, ...courseId };
    // console.log('course', course);
    return this.repo.save(course);
  }

  public async findCourseById(courseId: string) {
    const result = await this.repo.findOne({ courseId: courseId });

    if (!result) {
      throw new NotFoundException();
    }

    return result;
  }
}
