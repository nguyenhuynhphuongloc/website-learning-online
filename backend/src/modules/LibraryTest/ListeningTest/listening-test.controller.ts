import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, BadRequestException, Query, UploadedFiles, Req, UseGuards } from '@nestjs/common';
import { ListeningTestService } from './listening-test.service';
import { CreateListeningTestDto } from './dto/create-listening-test.dto';
import { UpdateListeningTestDto } from './dto/update-listening-test.dto';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path, { extname, join } from 'path';
import * as fs from 'fs';
import { Public } from 'src/decorator/custome';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
interface RequestWithTestId extends Request {
  testId?: string;
}

@Controller('listening-test')
export class ListeningTestController {
  constructor(private readonly listeningTestService: ListeningTestService) { }

  @Post('create-listening-test')
  @UseInterceptors(AnyFilesInterceptor({
    storage: diskStorage({
      destination: (req, file, cb) => {
        const baseDir = join(process.cwd(), 'public', 'Listening-Assets');

        // Tạo thư mục gốc nếu chưa có
        if (!fs.existsSync(baseDir)) {
          fs.mkdirSync(baseDir, { recursive: true });
        }

        // Nếu testId đã tồn tại trong req, sử dụng nó, nếu không tạo testId mới
        let testId = (req as any).testId;
        if (!testId) {
          // Đọc các thư mục con có tên dạng "testN"
          const subdirs = fs.readdirSync(baseDir)
            .filter(name => fs.statSync(join(baseDir, name)).isDirectory())
            .filter(name => /^test\d+$/.test(name));

          console.log('subdirs:', subdirs);

          // Tìm số lớn nhất hiện tại
          const maxIndex = subdirs.reduce((max, dir) => {
            const num = parseInt(dir.replace('test', ''), 10);
            return isNaN(num) ? max : Math.max(max, num);
          }, 0);

          testId = `test${maxIndex + 1}`;
          (req as any).testId = testId;  // Lưu testId vào req
        }

        const newDir = join(baseDir, testId);

        // Kiểm tra thư mục đã tồn tại chưa, nếu chưa thì tạo
        if (!fs.existsSync(newDir)) {
          console.log('Creating directory:', newDir);
          fs.mkdirSync(newDir, { recursive: true });
        }

        // Lưu tất cả các file vào thư mục đã tạo
        cb(null, newDir); // Tất cả các file sẽ lưu vào thư mục này
      },
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const filename = uniqueSuffix + extname(file.originalname);
        cb(null, filename); // Tên file duy nhất cho mỗi file
      }
    })
  }))
  async create(@UploadedFiles() files: Express.Multer.File[], @Req() req: RequestWithTestId) {

    const testId = req.testId;  // Lấy testId từ req mà ta đã gán trong destination

    // Lấy đường dẫn tới thư mục đã tạo cho test
    const testFolderPath = join(process.cwd(), 'public', 'Listening-Assets', testId);

    // Các file sẽ được lưu vào thư mục này
    console.log('Test folder path:', testFolderPath);

    // Phần còn lại của mã xử lý các file sau khi được tải lên...

    const audioFile = files.find(file => file.mimetype.startsWith('audio/'));
    const jsonFile = files.find(file => file.mimetype === 'application/json');

    if (!audioFile || !jsonFile) {
      throw new BadRequestException('Audio file and JSON file are required.');
    }

    const jsonPath = join(testFolderPath, jsonFile.filename);
    const jsonContent = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

    const audioPath = `http://localhost:8080/Listening-Assets/${testId}/${audioFile.filename}`;
    jsonContent.audio = audioPath;

    // Chuyển đổi nội dung JSON thành DTO
    const dto = plainToInstance(CreateListeningTestDto, jsonContent);

    // Validate DTO
    const errors = await validate(dto, { whitelist: true, forbidNonWhitelisted: true });

    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    // Lưu vào cơ sở dữ liệu
    return await this.listeningTestService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('getAll-listening-test')
  findAll(@Query() query: { page?: number; limit?: number }, @Req() req) {

    const { page, limit } = query;
 
    const userId = req.user.userId;
    console.log('page:', page);
    console.log('limit:', +limit);
    return this.listeningTestService.findAll("687dfdedca13d7a8c24542b0", +page, +limit);
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.listeningTestService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateListeningTestDto: UpdateListeningTestDto) {
    return this.listeningTestService.update(+id, updateListeningTestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.listeningTestService.remove(+id);
  }
}
