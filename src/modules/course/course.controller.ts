import {
  Controller,
  Get,
  Query,
  Req,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import {
  Crud,
  CrudController,
  CrudRequest,
  CrudRequestInterceptor,
  GetManyDefaultResponse,
  Override,
  ParsedBody,
  ParsedRequest,
} from '@nestjsx/crud';
import { Course } from 'src/entities/course.entity';
import { CourseService } from './course.service';
import {
  createCourseDto,
  getCourseDto,
  updateCourseDto,
} from './dto/course.dto';

@Crud({
  model: {
    type: Course,
  },
  params: {
    courseId: {
      field: 'courseId',
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
@ApiTags('Course')
@Controller('course')
export class CourseController implements CrudController<Course> {
  constructor(public service: CourseService) {}

  get base(): CrudController<Course> {
    return this;
  }

  @Override()
  updateOneBase(req: CrudRequest, dto: updateCourseDto): Promise<Course> {
    return this.base.updateOneBase(req, dto);
  }

  @UseInterceptors(CrudRequestInterceptor)
  @Get('/search')
  @ApiQuery({ name: 'title', required: false })
  @ApiQuery({ name: 'tags', required: false })
  @ApiQuery({ name: 'teacher', required: false })
  @ApiOkResponse({
    status: 200,
    type: getCourseDto,
    isArray: true,
    description: 'Found results',
  })
  async find(@Query() filters: string): Promise<getCourseDto[] | unknown[]> {
    // TODO: need more work
    console.log('filters', filters)
    return 
  }

  // FIXME: POST - /course allow create a duplicating course
  
}
