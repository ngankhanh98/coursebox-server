import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { localMySql, remoteMySql } from 'src/configs/database/mysql.config';
import { Course } from 'src/entities/course.entity';

export const DatabaseProvider = TypeOrmModule.forRootAsync({
  imports: [
    ConfigModule.forRoot({
      // load: [localMySql],
      load: [remoteMySql],
    }),
  ],
  inject: [ConfigService],
  useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
    return {
      // ...configService.get('localMySql'),
      ...configService.get('remoteMySql'),
      entities: [Course],
      keepConnectionAlive: true,
      synchronize: false,
      autoLoadEntities: true,
    };
  },
});
