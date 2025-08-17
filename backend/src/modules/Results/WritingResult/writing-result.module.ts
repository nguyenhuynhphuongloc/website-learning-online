import { forwardRef, Module } from '@nestjs/common';
import { WritingResultService } from './writing-result.service';
import { WritingResultController } from './writing-result.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { WritingResult } from './entities/writing-result.entity';
import { UserModule } from 'src/modules/User/user.module';
import { BlacklistModule } from 'src/modules/Blacklist/blacklist.module';
import { AuthModule } from 'src/auth/auth.module';
import { WritingResultSchema } from 'src/schemas/ResultShemas/WritingResult.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: WritingResult.name, schema: WritingResultSchema },
    ]),
    UserModule,
    forwardRef(() => AuthModule),
    forwardRef(() => BlacklistModule),
  ],
  controllers: [WritingResultController],
  providers: [WritingResultService],
  exports: [WritingResultService], // optional: export nếu module khác cần dùng service này
})
export class WritingResultModule { }
