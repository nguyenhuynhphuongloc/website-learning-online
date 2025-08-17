import { forwardRef, Module } from '@nestjs/common';
import { ReadingTestService } from './reading-test.service';
import { ReadingTestController } from './reading-test.controller';
import { ReadingTest, ReadingTestSchema } from 'src/schemas/TestSchemas/ReadingTest.schemas';
import { MongooseModule } from '@nestjs/mongoose';
import { ReadingResultSchema } from 'src/schemas/ResultShemas/ReadingResult.schemas';
import { UserModule } from 'src/modules/User/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { BlacklistModule } from 'src/modules/Blacklist/blacklist.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ReadingTest.name,
        schema: ReadingTestSchema,
      },
      { name: 'ReadingResult', schema: ReadingResultSchema },
    ]),
    UserModule,
    forwardRef(() => AuthModule),
    forwardRef(() => BlacklistModule),
  ],
  controllers: [ReadingTestController],
  providers: [ReadingTestService],
})
export class ReadingTestModule { }
