import { Controller, Delete, Get, Param } from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { ParticipantService } from './participant.service';

@ApiTags('Participant')
@Controller('/participant')
export class ParticipantController {
  constructor(private readonly participantService: ParticipantService) {}

  @Get('/:courseId')
  @ApiParam({ name: 'courseId' })
  @ApiOperation({ summary: 'Get participant in courseId' })
  getParticipantByCourseId(@Param() param: string) {
    return this.participantService.getParticipantByCourseId(param['courseId']);
  }

  @Delete('/:courseId/:userId')
  @ApiParam({ name: 'courseId' })
  @ApiParam({ name: 'userId' })
  @ApiOperation({
    summary: 'Unenroll or reject user from course',
  })
  async removeByCourseIdAndUserId(@Param() param: string) {
    return await this.participantService.removeEntry(
      param['userId'],
      param['courseId'],
    );
  }
}
