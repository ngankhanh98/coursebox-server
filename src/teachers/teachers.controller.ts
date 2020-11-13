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

import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
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
}
