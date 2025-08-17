import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/modules/User/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { BlacklistModule } from 'src/modules/Blacklist/blacklist.module';
import { WritingTest, WritingTestSchema } from 'src/schemas/TestSchemas/WritingTest.schemas';
import { WritingTestController } from 'src/modules/LibraryTest/WritingTest/writing-test.controller';
import { WritingTestService } from 'src/modules/LibraryTest/WritingTest/writing-test.service';
import { WritingResultSchema } from 'src/schemas/ResultShemas/WritingResult.schemas';


@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: WritingTest.name,
        schema: WritingTestSchema,
      },
      { name: 'WritingResult', schema: WritingResultSchema },
    ]),
    UserModule,
    forwardRef(() => AuthModule),
    forwardRef(() => BlacklistModule),
  ],
  controllers: [WritingTestController],
  providers: [WritingTestService],
})
export class WritingTestModule { }
