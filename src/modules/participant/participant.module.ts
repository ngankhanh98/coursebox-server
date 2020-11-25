import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Participant } from 'src/entities/participant.entity';
import { ParticipantController } from './participant.controller';
import { ParticipantService } from './participant.service';

@Module({
  imports: [TypeOrmModule.forFeature([Participant])],
  providers: [ParticipantService],
  exports: [ParticipantService],
  controllers: [ParticipantController],
})
export class ParticipantModule {}
