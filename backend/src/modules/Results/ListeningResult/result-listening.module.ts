import { forwardRef, Module } from '@nestjs/common';
import { ResultListeningService } from './result-listening.service';
import { ResultListeningController } from './result-listening.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/modules/User/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { BlacklistModule } from 'src/modules/Blacklist/blacklist.module';
import { listeningResult, listeningResultSchema } from 'src/schemas/ResultShemas/ListeningResult.schemas';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from 'src/auth/config/jwt.config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: listeningResult.name, schema: listeningResultSchema,
      },
    ]),
    UserModule,

    forwardRef(() => AuthModule),

    forwardRef(() => BlacklistModule),


    ConfigModule.forFeature(jwtConfig),

    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  controllers: [ResultListeningController],
  providers: [ResultListeningService],
})
export class ResultListeningModule { }
