import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController, CrudRequestInterceptor } from '@nestjsx/crud';
import { Observable } from 'rxjs';
import { Teachers } from 'src/entities/teachers.entity';
import { Any } from 'typeorm';
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
    const ret = await this.service.searchFor(filter);
    let normalisedResult = ret.flat();

    const result = normalisedResult.filter(
      (v, i, a) => a.findIndex(t => t['teacher_id'] === v['teacher_id']) === i,
    );

    return result;
  }
}
