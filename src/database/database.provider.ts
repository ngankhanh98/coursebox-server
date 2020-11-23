import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { localMySql, remoteMySql } from 'src/configs/database/mysql.config';
import { Course } from 'src/entities/course.entity';
import { Participant } from 'src/entities/participant.entity';
import { User } from 'src/entities/user.entity';
// import { localDBConfig } from 'src/configs/database.config';

export const DatabaseProvider = TypeOrmModule.forRootAsync({
  imports: [
    ConfigModule.forRoot({
      load: [localMySql],
      // load: [remoteMySql],
    }),
  ],
  inject: [ConfigService],
  useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
    return {
      ...configService.get('localMySql'),
      // ...configService.get('remoteMySql'),
      // entities: [Course, Participant, User],
      keepConnectionAlive: true,
      synchronize: false,
      autoLoadEntities: true,
    };
  },
});
