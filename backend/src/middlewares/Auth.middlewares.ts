// src/middlewares/auth.middleware.ts
import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) { }

  use(req: Request, res: Response, next: NextFunction) {

    const authHeader = req.headers['authorization'];

    const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

    if (!token) {
      throw new UnauthorizedException('Access token is missing');
    }

    try {

      const decoded = this.jwtService.verify(token, { secret: process.env.JWT_SECRET });

      req.user = decoded; // Gán user vào request

      next();

    } catch (err) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
