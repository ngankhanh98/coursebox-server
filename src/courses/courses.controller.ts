import { Body, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  Crud,
  CrudController,
  CrudRequest,
  Override,
  ParsedBody,
  ParsedRequest,
} from '@nestjsx/crud';
import { Courses } from 'src/entities/courses.entity';
import { CoursesService } from './courses.service';
import { createCourseDto, updateCourseDto } from './dto/course.dto';

@Crud({
  model: {
    type: Courses,
  },
  params: {
    course_id: {
      field: 'course_id',
      type: 'string',
      primary: true,
    },
  },
  routes: {
    exclude: ['createManyBase'],
  },
  serialize: {
    create: createCourseDto,
    update: createCourseDto,
  },
})
@ApiTags('Courses')
@Controller('courses')
export class CoursesController implements CrudController<Courses> {
  constructor(public service: CoursesService) {}

  get base(): CrudController<Courses> {
    return this;
  }

  @Override()
  updateOneBase(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: updateCourseDto,
  ) {
    return this.base.updateOneBase(req, dto);
  }
}
