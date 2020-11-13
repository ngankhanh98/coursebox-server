import { Controller, Get } from '@nestjs/common';
import { TeachersService } from './teachers.service';

@Controller('teachers')
export class TeachersController {
  constructor(private readonly TeachersService: TeachersService ) {
    
  }
  @Get('/')
  getAll(){
    return this.TeachersService.getAll()
  }
  
}
