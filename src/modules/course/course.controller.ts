import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
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
import { ParticipantService } from '../participant/participant.service';
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
    // exclude: ['createManyBase'],
    only: [
      'updateOneBase',
      'getOneBase',
      'replaceOneBase',
      'deleteOneBase',
      'getManyBase',
    ],
  },
  serialize: {
    create: updateCourseDto,
    update: updateCourseDto,
  },
})
@ApiTags('Course')
@Controller('course')
export class CourseController implements CrudController<Course> {
  constructor(
    public service: CourseService,
    private readonly participantService: ParticipantService,
  ) {}

  get base(): CrudController<Course> {
    return this;
  }

  @Override()
  updateOneBase(req: CrudRequest, dto: updateCourseDto): Promise<Course> {
    return this.base.updateOneBase(req, dto);
  }

  @Post('/')
  @ApiOperation({ summary: 'Create a course' })
  @ApiBody({ type: Course })
  async createOneCourse(
    @Req() req: updateCourseDto,
  ): Promise<Course | unknown> {
    return await this.service.createCourse(req['body']);
  }

  @UseInterceptors(CrudRequestInterceptor)
  @Get('/search')
  @ApiQuery({ name: 'title', required: false })
  @ApiQuery({ name: 'teacher', required: false })
  @ApiOperation({ summary: 'Search course' })
  @ApiOkResponse({
    status: 200,
    type: getCourseDto,
    isArray: true,
    description: 'Found results',
  })
  async find(@Query('') filters): Promise<getCourseDto[] | unknown[]> {
    return this.service.findByFilter(filters);
  }
  @Get('/:courseId/participant')
  @ApiParam({ name: 'courseId' })
  @ApiOperation({ summary: 'Get participant in courseId' })
  getParticipantByCourseId(@Param() param: string) {
    return this.participantService.getParticipantByCourseId(param['courseId']);
  }
}
