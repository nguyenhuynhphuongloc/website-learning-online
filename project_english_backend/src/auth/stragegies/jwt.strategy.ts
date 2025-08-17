import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigType } from '@nestjs/config';
import jwtConfig from 'src/auth/config/jwt.config';
import { AuthService } from 'src/auth/auth.service';
import { AuthPayload } from 'src/auth/types/auth-jwtPayload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @Inject(jwtConfig.KEY)
    private readonly jwtConf: ConfigType<typeof jwtConfig>,
    private readonly authService: AuthService, // nếu bạn cần validate user
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConf.secret,
      ignoreExpiration: false, // nếu bạn muốn kiểm tra thời gian hết hạn của token
    });
  }

  async validate(payload: AuthPayload) {
    const user = await this.authService.validateJwtUser(payload.sub);
    
    if (!user) throw new UnauthorizedException();
  
    return { userId: user._id.toString() }; // trả về object với key userId
  }

}
