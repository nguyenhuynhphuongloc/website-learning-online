import {
  Controller, Get, Post, Body, Patch, Param, Delete,
  UseInterceptors, UploadedFile,
  Query,
  UseGuards,
  Req
} from '@nestjs/common';
import { WritingTestService } from './writing-test.service';
import { CreateWritingTestDto } from './dto/create-writing-test.dto';
import { UpdateWritingTestDto } from './dto/update-writing-test.dto';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('writing-test')
export class WritingTestController {
  constructor(private readonly writingTestService: WritingTestService) { }

  @Post('create-writing-test')
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './public/assets',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const filename = uniqueSuffix + extname(file.originalname);
        cb(null, filename);
      }
    })
  }))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: any
  ) {
    const dto: CreateWritingTestDto = {
      title: body.title,
      sections: []
    };

    // Parse `sections` từ chuỗi JSON nếu cần
    try {
      const parsed = typeof body.sections === 'string' ? JSON.parse(body.sections) : body.sections;

      if (!Array.isArray(parsed)) {
        throw new Error("sections must be an array");
      }

      dto.sections = parsed;

      // Gán imagePath vào phần tử đầu tiên
      if (dto.sections.length > 0 && file) {
        dto.sections[0].imagePath = `/assets/${file.filename}`;
      }

    } catch (err) {
      console.error("Invalid sections format:", err.message);
      throw new Error("Invalid sections format. Must be a JSON array.");
    }

    console.log("Processed DTO:", dto);
    return await this.writingTestService.create(dto);
  }

  @Get('getALL')
  @UseGuards(JwtAuthGuard)
  async findAll(@Query() query: { page?: number; limit?: number }, @Req() req) {
    const { page, limit } = query;
    const userId = req.user.userId;
    return await this.writingTestService.getAll(userId, +page, +limit);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.writingTestService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateWritingTestDto: UpdateWritingTestDto) {
    return await this.writingTestService.update(id, updateWritingTestDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.writingTestService.remove(id);
  }
}
