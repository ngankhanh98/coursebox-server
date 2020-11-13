import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/database/database.module';
import { Teachers } from 'src/entites/teachers.entity';
import { TeachersController } from './teachers.controller';
import { TeachersService } from './teachers.service';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([Teachers])],
  controllers: [TeachersController],
  providers: [TeachersService],
})
export class TeachersModule {}
