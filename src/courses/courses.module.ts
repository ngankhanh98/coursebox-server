import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Courses } from 'src/entities/courses.entity';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Courses])],
  providers: [CoursesService],
  exports: [CoursesService],
  controllers: [CoursesController],
})
export class CoursesModule {}
