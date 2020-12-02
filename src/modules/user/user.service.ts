import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { plainToClass } from 'class-transformer';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';
import { hash } from 'src/common/utils';
import { Course } from 'src/entities/course.entity';
import { User } from 'src/entities/user.entity';
import { CourseService } from '../course/course.service';
import { ParticipantService } from '../participant/participant.service';
import { getUserBase, updateUser } from './dto/user.dto';

@Injectable()
export class UserService extends TypeOrmCrudService<User> {
  constructor(
    @InjectRepository(User) private readonly userRepository,
    private readonly jwtService: JwtService,
    private readonly courseService: CourseService,
    private readonly participantService: ParticipantService,
  ) {
    super(userRepository);
  }
  private readonly logger = new Logger(UserService.name);

  public async findUserByUsername(username: string) {
    return await this.userRepository.findOne({ username: username });
  }

  public async getAccessToken(user: any) {
    const payload = { username: user.username };
    const accessToken = this.jwtService.sign(payload);
    this.logger.debug(accessToken);
    this.logger.debug(this.jwtService);

    return await { accessToken: accessToken };
  }

  public async updateOneUser(username: string, user: updateUser) {
    const oldUser = await this.findUserByUsername(username);
    if (!oldUser) throw new NotFoundException();
    const newPwd = hash(user?.password);

    const newUser = user?.password
      ? { ...oldUser, ...user, password: newPwd }
      : { ...oldUser, ...user };
    return await this.userRepository.save(newUser);
  }

  public async deleteOneUser(username: string): Promise<void | User> {
    console.log('username', username);
    const oldUser = await this.findUserByUsername(username);
    if (!oldUser) throw new NotFoundException();
    return await this.userRepository.delete({ username: username });
  }

  async enrollCourse(username: string, courseId: string) {
    try {
      let user = await this.findUserByUsername(username);
      if (!user) throw new NotFoundException();

      const course = await this.courseService.findCourseById(courseId);

      // FIXME: cannot insert roleId
      // At this time, enroll -> roleId auto 'member'
      user = { ...user, courses: [{ ...course }] };

      return await this.userRepository.save(user);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findByFilter(filters: any) {
    const keys = Object.keys(filters);
    const values = Object.values(filters);

    const promises = keys.map(
      (key, index) =>
        new Promise(resolve => {
          resolve(
            this.repo
              .createQueryBuilder()
              .select()
              .where(
                `MATCH (${key}) AGAINST ('${values[index]}' IN BOOLEAN MODE)`,
              )
              .getMany(),
          );
        }),
    );

    return Promise.all(promises).then(value => {
      console.log(value);
      return value;
    });
  }
}
