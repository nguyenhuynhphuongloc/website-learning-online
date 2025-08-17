import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, HttpException } from '@nestjs/common';
import { ResultReadingService } from './result-reading.service';
import { CreateResultReadingDto } from './dto/create-result-reading.dto';
import { UpdateResultReadingDto } from './dto/update-result-reading.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import mongoose from 'mongoose';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('result-reading')
export class ResultReadingController {

  constructor(private readonly resultReadingService: ResultReadingService) { }

  @Post('store-result')
  @UseGuards(JwtAuthGuard)
  create(@Body() createResultReadingDto: CreateResultReadingDto, @Req() req) {
    const userId = req.user.userId;
    return this.resultReadingService.create(createResultReadingDto, userId);
  }

  @Get('find_all_test')
  @UseGuards()
  findAll(@Req() req) {

    const userId = req.user.userId;

    console.log(userId)

    const isValid = mongoose.Types.ObjectId.isValid(userId);

    if (!isValid) throw new HttpException('User not found', 404);

    return this.resultReadingService.findAll(userId);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string, @Req() req) {

    const userId = req.user.userId;

    const isValid = mongoose.Types.ObjectId.isValid(userId);

    if (!isValid) throw new HttpException('User not found', 404);

    console.log(id)

    console.log(userId)

    return await this.resultReadingService.findOne(id, userId);

  }

  @Patch('update-result')
  @UseGuards(JwtAuthGuard)
  update(@Req() req, @Body() updateResultReadingDto: UpdateResultReadingDto) {
    const userId = req.user.userId;
    return this.resultReadingService.update(userId, updateResultReadingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.resultReadingService.remove(+id);
  }
}
