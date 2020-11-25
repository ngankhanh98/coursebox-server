import { Module } from '@nestjs/common';
import { Connection } from 'typeorm';
import { DatabaseProvider } from './database.provider';

@Module({
  imports: [DatabaseProvider],
})
export class DatabaseModule {
  constructor(public connection: Connection) {}
}
