import { Controller, Get } from '@nestjs/common';

@Controller('teachers')
export class TeachersController {
  
  @Get('/')
  getTeacher(): string {
    return 'hello from teacher';
  }
}
