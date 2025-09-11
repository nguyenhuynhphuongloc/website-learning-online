
import { Controller, Get, Request, Post, UseGuards, Req } from '@nestjs/common';

import { AuthService } from './auth/auth.service';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';


@UseGuards(AuthGuard())
@Controller('app')
export class AppController {
  getHello(): any {
    throw new Error('Method not implemented.');
  }
  constructor(private authService: AuthService) { }

  @Get('profile')
  someProtectRoute(@Req() req) {
    return { message: 'Access Resource', userId: req.user._id }
  }
}
