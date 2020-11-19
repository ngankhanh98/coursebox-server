import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Courses } from "src/entities/courses.entity";


@Injectable()
export class CoursesService extends TypeOrmCrudService<Courses> {
  constructor(@InjectRepository(Courses) repo) {
    super(repo);
  }
}