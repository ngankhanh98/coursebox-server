import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { localMySql, remoteMySql } from 'src/configs/database/mysql.config';
// import { localDBConfig } from 'src/configs/database.config';
import { Teachers } from '../entities/teachers.entity';

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
      entities: [Teachers],
      keepConnectionAlive: true,
      synchronize: true,
      autoLoadEntities: true,
    };
  },
});
