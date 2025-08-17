import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, Query, UseGuards, Req } from '@nestjs/common';
import { ReadingTestService } from './reading-test.service';
import { CreateReadingTestDto } from './dto/create-reading-test.dto';
import { UpdateReadingTestDto } from './dto/update-reading-test.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('reading-test')
export class ReadingTestController {
  constructor(private readonly readingTestService: ReadingTestService) { }

  @Post('create-reading-test')
  @UseInterceptors(FileInterceptor('file'))
  async create(@UploadedFile() file: Express.Multer.File) {
    try {
      const jsonString = file.buffer.toString('utf-8');
      const parsed = JSON.parse(jsonString);

      return await this.readingTestService.create(parsed);

    } catch (err) {
      console.error(' JSON Parse Error:', err.message);
      throw new Error('Invalid JSON file.');
    }
  }

  @Get('getAll-reading-test')
  @UseGuards(JwtAuthGuard)
  getAll(@Query() query: { page?: number; limit?: number }, @Req() req: any) {
    const { page, limit } = query;
    const userId = req.user.userId;
    console.log('page:', page);
    console.log('limit:', +limit);
    return this.readingTestService.findAll(userId, +page, +limit);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.readingTestService.findOne(id);
  }

  @Get('full/:id')
  async findOneFull(@Param('id') id: string) {
    return await this.readingTestService.findOneFull(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReadingTestDto: UpdateReadingTestDto) {
    return this.readingTestService.update(id, updateReadingTestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.readingTestService.remove(id);
  }
}



