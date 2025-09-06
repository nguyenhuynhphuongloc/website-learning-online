import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Request, Response } from 'express';
import { Model } from 'mongoose';
import { BlacklistService } from '../../modules/Blacklist/blacklist.service';
import { RefreshToken } from 'src/schemas/RefreshToken.schemas';



@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(RefreshToken.name) private refreshTokenModel: Model<RefreshToken>,
    private readonly blacklistService: BlacklistService,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {

    const request = context.switchToHttp().getRequest<Request>();

    const response = context.switchToHttp().getResponse<Response>();

    const token = this.extractTokenFromHeader(request);

    if (!token) throw new UnauthorizedException('Missing or invalid token');


    const isBlacklisted = await this.blacklistService.FindAccesstoken(token);

    if (isBlacklisted) throw new UnauthorizedException('Token is in blacklist');

    try {

      const decoded = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });

      request.user = { userId: decoded.sub._id };

      return true;

    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return this.handleExpiredToken(request, response);
      } else {
        Logger.error(error.message);
        throw new UnauthorizedException('Invalid token');
      }
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const authHeader = request.headers.authorization;
    return authHeader?.startsWith('Bearer') ? authHeader.split(' ')[1] : undefined;
  }

  private async handleExpiredToken(
    request: Request,
    response: Response,
  ): Promise<boolean> {
    const refreshToken = request.cookies['refreshToken'];
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token missing');
    }

    try {
      const decodedRefreshToken = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_SECRET,
      });

  
      const tokenDoc = await this.refreshTokenModel.findOne({
        token: refreshToken,
        userId: decodedRefreshToken.userId, 
      });

      if (!tokenDoc) {
        throw new UnauthorizedException('Invalid refresh token');
      }


      const newAccessToken = this.jwtService.sign(
        { userId: decodedRefreshToken.userId },
        { secret: process.env.JWT_SECRET, expiresIn: '1h' },
      );

      response.setHeader('Authorization', `Bearer ${newAccessToken}`);

      request.user = { userId: decodedRefreshToken.userId };

      return true;

    } catch (error) {
      Logger.error(error.message);
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }
}
