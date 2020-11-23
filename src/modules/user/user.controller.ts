import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBody,
  ApiHeader,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  Crud,
  CrudController,
  CrudRequest,
  CrudRequestInterceptor,
  Override,
  ParsedBody,
} from '@nestjsx/crud';
import { plainToClass } from 'class-transformer';
import { User } from 'src/entities/user.entity';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { getUser, getUserWithoutPassword, updateUser } from './dto/user.dto';
import { UserService } from './user.service';
import { DatabaseProvider } from 'src/database/database.provider';
import { hash } from 'src/common/utils';

@ApiTags('User')
@UseGuards(JwtAuthGuard)
@Crud({
  model: {
    type: User,
  },
  routes: {
    only: ['getManyBase', 'deleteOneBase', 'getOneBase'],
  },
  params: {
    username: {
      field: 'username',
      type: 'string',
      primary: true,
    },
  },
  serialize: {
    get: getUserWithoutPassword,
    update: getUserWithoutPassword,
  },
})
@ApiHeader({
  name: 'access-token',
})
@Controller('user')
export class UserController implements CrudController<User> {
  constructor(public service: UserService) {}

  @UseInterceptors(CrudRequestInterceptor)
  @ApiOkResponse({
    status: 200,
    type: getUserWithoutPassword,
    description: 'Retrive my user information',
  })
  @Get('/me')
  async getMe(@Request() req) {
    const username = req['user'];
    return plainToClass(
      getUserWithoutPassword,
      await this.service.findUserByUsername(username),
    );
  }

  get base(): CrudController<User> {
    return this;
  }

  @Patch('/')
  updateOneUser(@Req() req, @Body() dto: updateUser) {
    return this.service.updateOneUser(req['user'], dto);
  }
}
