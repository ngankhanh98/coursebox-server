import {
  Controller,
  Get,
  Post,
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
import { generateId } from 'src/common/utils';
import { Course } from 'src/entities/course.entity';
import { CourseService } from './course.service';
import { getCourseDto, updateCourseDto } from './dto/course.dto';

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
    create: updateCourseDto,
    update: updateCourseDto,
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

  // @Override()
  // createOneBase(
  //   @ParsedRequest() req: CrudRequest,
  //   @ParsedBody() dto: updateCourseDto,
  // ):any {
  //   console.log('Call');
  //   const course = new Course();
  //   // course.title = dto.title;
  //   // course.courseId = generateId(course.title + new Date().toUTCString());
  //   return 'this.base.createOneBase(req, course);'
  // }


  // FIXME: No metadata found. There is more than once class-validator version installed proon installed probably. You need to flatten your dependencies.   
  @UseInterceptors(CrudRequestInterceptor)
  @Post('/course')
  async createOneCourse(
    @Req() body: updateCourseDto,
  ): Promise<Course | unknown> {
    return await this.service.createCourse(body);
    // // TODO: need more work
    // console.log('filters', filters);
    // return;
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
    console.log('filters', filters);
    return;
  }

  // FIXME: POST - /course allow create a duplicating course
}
