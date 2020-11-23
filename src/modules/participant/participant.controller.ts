import { Controller, Get, Param } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ParticipantService } from './participant.service';

@ApiTags('Participant')
@Controller('/participant')
export class ParticipantController {
  constructor(private readonly participantService: ParticipantService) {}

  @Get('/:courseId')
  @ApiParam({ name: 'courseId' })
  @ApiOperation({summary: 'Get participant in courseId' })
  getParticipantByCourseId(@Param() param: string) {
    return this.participantService.getParticipantByCourseId(param['courseId']);
  }
}
