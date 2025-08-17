import { forwardRef, Module } from '@nestjs/common';
import { ResultReadingService } from './result-reading.service';
import { ResultReadingController } from './result-reading.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ReadingResult, ReadingResultSchema } from 'src/schemas/ResultShemas/ReadingResult.schemas';
import { UserModule } from 'src/modules/User/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { BlacklistModule } from 'src/modules/Blacklist/blacklist.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ReadingResult.name, schema: ReadingResultSchema,
      },
    ]),
    UserModule,
    forwardRef(() => AuthModule),
    forwardRef(() => BlacklistModule),
  ],

  controllers: [ResultReadingController],
  providers: [ResultReadingService, AuthGuard],
  exports: [ResultReadingService, AuthGuard],
})
export class ResultReadingModule { }
