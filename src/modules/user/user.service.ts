import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { plainToClass } from 'class-transformer';
import { hash } from 'src/common/utils';
import { User } from 'src/entities/user.entity';
import { getUserWithoutPassword, updateUser } from './dto/user.dto';

@Injectable()
export class UserService extends TypeOrmCrudService<User> {
  constructor(
    @InjectRepository(User) private readonly userRepository,
    private readonly jwtService: JwtService,
  ) {
    super(userRepository);
  }
  private readonly logger = new Logger(UserService.name);

  public async findUserByUsername(username: string) {
    return this.userRepository.findOne({ username: username });
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
    const newPwd = hash(user?.password);

    const newUser = user?.password
      ? { ...oldUser, ...user, password: newPwd }
      : { ...oldUser, ...user };
    return await this.userRepository.save(newUser)
  }
}
