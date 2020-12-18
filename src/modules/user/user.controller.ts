import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Req,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiHeader,
  ApiOkResponse,
  ApiProduces,
  ApiProperty,
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
} from '@nestjsx/crud';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { Course } from 'src/entities/course.entity';
import { User } from 'src/entities/user.entity';
import { getUserBase, updateUser } from './dto/user.dto';
import { UserService } from './user.service';

@ApiTags('User')
@Crud({
  model: {
    type: getUserBase,
  },
  routes: {
    only: ['getManyBase', 'getOneBase'],
  },
  params: {
    username: {
      field: 'username',
      type: 'string',
      primary: true,
    },
  },
  serialize: {
    get: getUserBase,
    update: getUserBase,
  },
})
@Controller('user')
export class UserController implements CrudController<User> {
  constructor(public service: UserService) {}

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(CrudRequestInterceptor)
  @ApiOkResponse({
    status: 200,
    type: getUserBase,
    description: 'Retrive my user information',
  })
  @ApiHeader({
    name: 'access-token',
  })
  @Get('/me')
  async getMe(@Request() req) {
    console.log('req', req['user']);
    return await this.service.findUserByUsername(req['user']);
  }

  get base(): CrudController<User> {
    return this;
  }

  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    type: getUserBase,
  })
  @ApiHeader({
    name: 'access-token',
  })
  @Patch('/')
  updateOneUser(@Req() req, @Body() dto: updateUser) {
    return this.service.updateOneUser(req['user'], dto);
  }

  @Override()
  getManyBase(req: CrudRequest) {
    return this.base.getManyBase(req);
  }

  @UseGuards(JwtAuthGuard)
  @ApiHeader({
    name: 'access-token',
  })
  @Delete('/')
  deleteOneUser(@Req() req) {
    return this.service.deleteOneUser(req['user']);
  }

  @UseGuards(JwtAuthGuard)
  @ApiHeader({ name: 'access-token' })
  @ApiQuery({ name: 'courseId', required: true })
  @ApiQuery({ name: 'roleId', required: true })
  @Post('/enroll')
  enrollCourse(@Req() req) {
    return this.service.enrollCourse(
      req['user'],
      req.query['courseId'],
      req.query['roleId'],
    );
  }
}
