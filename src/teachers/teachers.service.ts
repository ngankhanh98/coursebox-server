import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Teachers } from 'src/entities/teachers.entity';

@Injectable()
export class TeachersService extends TypeOrmCrudService<Teachers> {
  constructor(@InjectRepository(Teachers) repo) {
    super(repo);
  }

  async searchFor(filters: Object) {
    const keys = Object.keys(filters);
    const values = Object.values(filters);
    const promises = keys.map(
      (key, index) =>
        new Promise(resolve => {
          console.log('key', key);
          console.log('value', values[index]);
          resolve(
            this.repo
              .createQueryBuilder()
              .select()
              .where(
                `MATCH(${key}) AGAINST ('${values[index]}' IN BOOLEAN MODE)`,
              )
              .getMany(),
          );
        }),
    );

    return Promise.all(promises).then(value => {
      console.log(value);
      return value;
    });
  }
}
