import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as path from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: {
      origin: 'http://localhost:3000', // Cho phép domain này truy cập
      methods: 'GET,POST,PUT,DELETE', // Cấu hình các phương thức HTTP
      allowedHeaders: 'Content-Type, Authorization', // Cấu hình headers
      credentials: true, // Nếu cần gửi cookie trong yêu cầu
    },
  });

  // Sử dụng global validation pipe cho tất cả các request
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  app.use(cookieParser());

  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:3001'], // Thêm tất cả các frontend được phép
    credentials: true, // nếu dùng cookie, authorization header
  });

  app.useStaticAssets(path.join(__dirname, '..', 'public'));


  // Kiểm tra cổng từ biến môi trường, nếu không có thì dùng 3000
  const port = process.env.PORT || 5001;
  console.log(`Server running on port ${port}`);

  // Khởi động server
  await app.listen(port);
  console.log(`🚀 Server started on port ${port}`);
}
bootstrap();
