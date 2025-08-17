import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, HttpException, Redirect } from '@nestjs/common';
import { ResultListeningService } from './result-listening.service';
import { CreateResultListeningDto } from './dto/create-result-listening.dto';
import { UpdateResultListeningDto } from './dto/update-result-listening.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';



@Controller('result-listening')
export class ResultListeningController {
  constructor(
    private readonly resultListeningService: ResultListeningService
  ) { }

  @Post('store-result')
  @UseGuards(JwtAuthGuard)
  async create(@Body() createResultListeningDto: CreateResultListeningDto, @Req() req) {


    const userId = req.user.userId;

    return await this.resultListeningService.create(createResultListeningDto, userId)

  }

  @Get('all')
  @UseGuards(JwtAuthGuard)
  async findAll(@Req() req) {

    const userId = req.user.userId;

    return await this.resultListeningService.findAll(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req) {

    const userId = req.user.userId;

    return await this.resultListeningService.findOne(id, userId)

  }

  @Patch('update-result')
  @UseGuards(JwtAuthGuard)
  update(@Req() req, @Body() updateResultListeningDto: UpdateResultListeningDto) {

    const userId = req.user.userId;

    return this.resultListeningService.update(userId, updateResultListeningDto);

  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.resultListeningService.remove(+id);
  }
}
