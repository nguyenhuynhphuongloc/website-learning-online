import { Injectable, Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigType } from '@nestjs/config';
import jwtConfig from 'src/auth/config/jwt.config';
import { AuthService } from 'src/auth/auth.service';
import { AuthPayload } from 'src/auth/types/auth-jwtPayload';
import refreshjwtConfig from 'src/auth/config/refreshjwt.config';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'refresh-jwt') {
  constructor(
    @Inject(jwtConfig.KEY)
    private readonly refreshTokenCofig: ConfigType<typeof refreshjwtConfig>,
    private readonly authService: AuthService, // nếu bạn cần validate user
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refresh'),
      secretOrKey: refreshTokenCofig.secret,
      ignoreExpiration: false, // nếu bạn muốn kiểm tra thời gian hết hạn của token
      passReqToCallback: true
    });
  }
  async validate(req: Request, payload: AuthPayload) {

    const userId = payload.sub;

    const refreshToken = req.body.refresh;

    return await this.authService.validateRefreshToken(userId, refreshToken);
    
  }
}
