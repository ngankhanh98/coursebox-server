// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Teachers } from 'src/entities/teachers.entity';
// import { Repository } from 'typeorm';

// @Injectable()
// export class TeachersService {
//   constructor(
//     @InjectRepository(Teachers)
//     private readonly TeachersRepository: Repository<Teachers>,
//   ) {}

//   async getAll() {
//     return await this.TeachersRepository.find({})
//   }
// }


import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Teachers } from "src/entities/teachers.entity";


@Injectable()
export class TeachersService extends TypeOrmCrudService<Teachers> {
  constructor(@InjectRepository(Teachers) repo) {
    super(repo);
  }
}