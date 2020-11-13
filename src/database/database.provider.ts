import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { localDBConfig } from 'src/configs/database.config';
import { Teachers } from '../entities/teachers.entity';

export const DatabaseProvider = TypeOrmModule.forRootAsync({
  imports: [
    ConfigModule.forRoot({
      load: [localDBConfig],
    }),
  ],
  inject: [ConfigService],
  useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
    return {
      ...configService.get('localDB'),
      entities: [Teachers],
      keepConnectionAlive: true,
      synchronize: true,
      autoLoadEntities: true,
    };
  },
});
