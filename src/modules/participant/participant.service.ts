import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Participant } from 'src/entities/participant.entity';

@Injectable()
export class ParticipantService {
  constructor(
    @InjectRepository(Participant) private readonly participantRepository,
  ) {}

  async findByCourseIdAndUserId(courseId: string, userId: string) {
    return this.participantRepository.find({
      courseId: courseId,
      userId: userId,
    });
  }
  async addEntry(entry: Participant) {
    return await this.participantRepository.save(entry);
  }

  async getParticipantByCourseId(courseId: string) {
    const result = await this.participantRepository.find({
      courseId: courseId,
    });
    return result;
  }

  async removeEntry(userId: string, courseId: string) {
    return await this.participantRepository.delete({
      userId: userId,
      courseId: courseId,
    });
  }
}
