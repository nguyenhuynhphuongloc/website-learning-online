import { forwardRef, Module } from '@nestjs/common';
import { ListeningTestService } from './listening-test.service';
import { ListeningTestController } from './listening-test.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ListeningTest, ListeningTestSchema } from 'src/schemas/TestSchemas/ListeningTest.schemas';
import { listeningResultSchema } from 'src/schemas/ResultShemas/ListeningResult.schemas';
import { UserModule } from 'src/modules/User/user.module';
import { BlacklistModule } from 'src/modules/Blacklist/blacklist.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ListeningTest.name, schema: ListeningTestSchema },
      { name: 'listeningResult', schema: listeningResultSchema },
    ]),
    UserModule,
    forwardRef(() => BlacklistModule),
    forwardRef(() => AuthModule),
  ],
  controllers: [ListeningTestController],
  providers: [ListeningTestService],
  exports: [ListeningTestService],
})
export class ListeningTestModule { }
