import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { passportStrategies } from 'src/constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, passportStrategies.AUTH) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromHeader('access-token'),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_AUTH_SECRET,
    });
  }

  async validate(payload: any) {
    return payload.username;
  }
}
