import { Put, Req, UseGuards } from '@nestjs/common';
import { Body, Controller, Delete, Get, HttpException, Param, Patch, Post, Query } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import mongoose from 'mongoose';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Public } from 'src/decorator/custome';
import { CreateUserDto } from 'src/modules/User/dto/CreateUser.dto';
import { UpdateUserDto } from 'src/modules/User/dto/UpdateUser.dto';
import { UserService } from 'src/modules/User/user.service';

@Controller('user')
export class UserControler {
  constructor(private userService: UserService) { }

  @Post()
  async CreateUser(@Body() CreateUser: CreateUserDto) {
    return await this.userService.createUser(CreateUser);
  }

  @Get('All')
  @Throttle({ default: { ttl: 30000, limit: 5 } }) // Giới hạn 10 request trong 60 giây
  @Public()
  FindAll(@Query() query) {
    return this.userService.findAll(query);
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  async GetProfile(@Req() req) {
    const userId = req.user.userId;
    return await this.userService.getProfile(userId);
  }

  @Get('getUserById')
  @UseGuards(AuthGuard)
  async getUserByid(@Req() req) {

    const userId = req.user.userId;
    console.log(userId)
    const isValid = mongoose.Types.ObjectId.isValid(userId);
    if (!isValid) throw new HttpException('User not found', 404);

    return await this.userService.getUserByid(userId);

  }


  @Get('get_userID')
  @Throttle({ default: { ttl: 30000, limit: 5 } }) // Giới hạn 10 request trong 60 giây
  @UseGuards(AuthGuard)
  async getUserId(@Req() req) {

    const userId = req.user.userId;

    console.log(userId)

    return userId;

  }

  @Patch(':id')
  async updateUser(@Param('id') id: string, @Body() updateUser: UpdateUserDto) {


    const isValid = mongoose.Types.ObjectId.isValid(id);

    if (!isValid) throw new HttpException('User not found', 404);

    return this.userService.updateUser(id, updateUser);
  }


  @Put('updateProfile')
  @UseGuards(AuthGuard)
  async updateProfile(@Req() req: any, @Body() updateUser: UpdateUserDto) {

    const userId = req.user.userId;
    const isValid = mongoose.Types.ObjectId.isValid(userId);

    console.log('userid', userId);



    return await this.userService.updateProfile(userId, updateUser);
  }


  @Delete(':id')
  async DeleteUser(@Param('id') id: string) {


    const isValid = mongoose.Types.ObjectId.isValid(id);

    if (!isValid) throw new HttpException('User not found', 404);

    return this.userService.DeleteUser(id);
  }

}
