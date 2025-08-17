import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { WritingResultService } from './writing-result.service';
import { CreateWritingResultDto } from './dto/create-writing-result.dto';
import { UpdateWritingResultDto } from './dto/update-writing-result.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('writing-result')
export class WritingResultController {
  constructor(private readonly writingResultService: WritingResultService) { }

  @Post('store-result')
  @UseGuards(JwtAuthGuard)
  async create(@Body() createWritingResultDto: CreateWritingResultDto, @Req() req) {
    const userId = req.user.userId;
    return await this.writingResultService.create(createWritingResultDto, userId);
  }

  @Get()
  findAll() {
    return this.writingResultService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.writingResultService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWritingResultDto: UpdateWritingResultDto) {
    return this.writingResultService.update(id, updateWritingResultDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.writingResultService.remove(id);
  }
}
