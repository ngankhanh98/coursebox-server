import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { exceptionMessage } from 'src/constants';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/modules/user/user.service';
import { Repository } from 'typeorm';
import { compare, hash, generateId } from 'src/common/utils';
import { createUserDTO } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly authRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  private readonly logger = new Logger(AuthService.name);

  // C#, PHP là ngôn ngữ đồng bộ
  // JS là ngôn ngữ bất đồng bộ
  // callback => promise => async/await
  //
  public async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findUserByUsername(username);
    const verify = user ? await compare(password, user.password) : false;

    if (user && verify) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  public async register(user: createUserDTO) {
    const newUser = new User();
    const { username, password } = user;

    const existedUser = await this.userService.findUserByUsername(
      user.username,
    );
    if (!existedUser)
      try {
        newUser.userId = generateId(username); // username unique --> userId unique
        console.log('newUser.userId', newUser.userId);
        newUser.password = hash(password);
        newUser.username = username;
        return await this.authRepository.save(newUser);
      } catch (error) {
        throw new InternalServerErrorException(error.message);
      }

    throw new ConflictException(exceptionMessage.USER_ALREADY_EXIST);
  }

  public async login(user) {
    return await this.userService.getAccessToken(user);
  }

  public async getResetPwdToken(username: string) {
    const existedUser = await this.userService.findUserByUsername(username);
    const payload = { username: username };

    this.logger.debug(this.jwtService);

    if (!existedUser)
      throw new NotFoundException(exceptionMessage.USER_NOT_FOUND);

    return await this.jwtService.sign(payload);
  }

  public async setPassword(username, newPassword) {
    console.log(this.authRepository.manager);
    return await this.authRepository.update(
      { username: username },
      { password: hash(newPassword) },
    );
  }
}
