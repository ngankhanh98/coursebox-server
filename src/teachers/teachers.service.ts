import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Teachers } from 'src/entities/teachers.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TeachersService {
  constructor(
    @InjectRepository(Teachers)
    private readonly TeachersRepository: Repository<Teachers>,
  ) {}

  async getAll() {
    const result = await this.TeachersRepository.find({})
    const connection = await this.TeachersRepository.manager;
    console.log('connection', connection);
    console.log('this.TeachersRepository', this.TeachersRepository);
    console.log('result', result);
    return result;
  }
}
