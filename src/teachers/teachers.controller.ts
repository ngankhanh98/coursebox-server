// import { Controller, Get } from '@nestjs/common';
// import { TeachersService } from './teachers.service';

// @Controller('teachers')
// export class TeachersController {
//   constructor(private readonly TeachersService: TeachersService) {}
//   @Get('/')
//   getAll() {
//     return this.TeachersService.getAll();
//   }
// }

import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController, CrudRequestInterceptor } from '@nestjsx/crud';
import { Teachers } from 'src/entities/teachers.entity';
import { TeachersService } from './teachers.service';

@Crud({
  model: {
    type: Teachers,
  },
  params: {
    teacher_id: {
      field: 'teacher_id',
      type: 'string',
      primary: true,
    },
  },
  routes: {
    exclude: ['createManyBase'],
  },
})
@ApiTags('Teachers')
@Controller('teachers')
export class TeachersController implements CrudController<Teachers> {
  constructor(public service: TeachersService) {}

  // @Get('/me')

  @UseInterceptors(CrudRequestInterceptor)
  @Get('/search')
  // FIXME: how to shorten @ApiQuery, what if users are let to query with 100 filter \O/
  @ApiQuery({ name: 'fullname', required: false })
  @ApiQuery({ name: 'teacher_id', required: false })
  async find(@Query('') filter: string) {
    return await this.service.searchFor(filter);
  }
}
