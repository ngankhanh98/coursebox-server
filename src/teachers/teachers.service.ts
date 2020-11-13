import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Teachers } from 'src/entites/teachers.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TeachersService {
  constructor(
    @InjectRepository(Teachers)
    private readonly TeachersRepository: Repository<Teachers>,
  ) {}

  getAll() {
    return this.TeachersRepository.find({});
  }
}
