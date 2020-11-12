import { TypeOrmModule } from '@nestjs/typeorm';

export default TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'coursebox',
  entities: ['"dist/**/*.entity{.ts,.js}"'],
  synchronize: true,
});
