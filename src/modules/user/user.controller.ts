import {
  Controller,
  Get,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
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
} from '@nestjsx/crud';
import { plainToClass } from 'class-transformer';
import { User } from 'src/entities/user.entity';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { getUser, getUserWithoutPassword } from './dto/user.dto';
import { UserService } from './user.service';

@ApiTags('User')
@UseGuards(JwtAuthGuard)
@Crud({
  model: {
    type: User,
  },
  routes: {
    exclude: [
      'createOneBase',
      'createManyBase',
      'getManyBase',
      'replaceOneBase',
    ],
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
      getUser,
      await this.service.findUserByUsername(username),
    );
  }

  get base(): CrudController<User> {
    return this;
  }

  @Override()
  async updateOneBase(
    req: CrudRequest,
    dto: getUserWithoutPassword,
  ): Promise<getUserWithoutPassword> {
    const result = await this.base.updateOneBase(req, dto);
    return plainToClass(getUserWithoutPassword, result);
  }
}
