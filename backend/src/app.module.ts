import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from 'src/app.controller';
import { AuthModule } from 'src/auth/auth.module';
import { MailService } from 'src/mails/mail.service';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerModule } from '@nestjs-modules/mailer';
import { UserModule } from 'src/modules/User/user.module';
import { CommentModule } from 'src/modules/Comment/comment.module';
import { CacheModule } from '@nestjs/cache-manager';
import { ThrottlerModule } from '@nestjs/throttler';
import { JwtModule } from '@nestjs/jwt';
import { ChatModule } from 'src/chats/chat.module';
import { PassportModule } from '@nestjs/passport';
import { LoggerMiddleware } from 'src/middlewares/logger.middlewares';
import { BlacklistModule } from './modules/Blacklist/blacklist.module';
import { PaymentModule } from 'src/modules/Payment/payment.module';
import { ListeningTestModule } from 'src/modules/LibraryTest/ListeningTest/listening-test.module';
import { ReadingTestModule } from 'src/modules/LibraryTest/ReadingTest/reading-test.module';
import { WritingTestModule } from 'src/modules/LibraryTest/WritingTest/writing-test.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { WalletModule } from 'src/modules/Walet/wallet.module';
import { ResultReadingModule } from 'src/modules/Results/ReadingResult/result-reading.module';
import { ResultListeningModule } from 'src/modules/Results/ListeningResult/result-listening.module';
import { WritingResultModule } from 'src/modules/Results/WritingResult/writing-result.module';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 10,
        },
      ],
    }),
    ChatModule,
    PassportModule,
    PaymentModule,
    CacheModule.register(),
    UserModule,
    CommentModule,
    ListeningTestModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {

        const uri = configService.get<string>('MONGODB_URI');

        if (!uri) {
          throw new Error('MongoDB connection string (MONGODB_URL) is not defined in the .env file');
        }

        console.log('MongoDB URI:', uri);

        return {
          uri,
          authSource: 'admin',
        };
      },
      inject: [ConfigService],
    }),


    MailerModule.forRootAsync({

      useFactory: async (config: ConfigService) => ({


        transport: {
          host: config.get<string>('MAIL_HOST'),
          secure: false,
          auth: {
            user: config.get<string>('Mail_User'),
            pass: config.get<string>('Mail_password'),
          },
          connectionTimeout: 10000,
        },
        defaults: {
          from: `"No Reply" <${config.get<string>('dsa')}>`,
        },
        template: {
          dir: join(__dirname, 'mails'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/assets',
    }),

    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: 3600,
        },
      }),
      inject: [ConfigService],
    }),

    ReadingTestModule,

    WritingTestModule,

    BlacklistModule,

    WalletModule,

    ResultReadingModule,

    ResultListeningModule,

    WritingResultModule,


  ],
  controllers: [AppController],
  providers: [
    MailService,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(
      {
        path: '/user/All',
        method: RequestMethod.ALL,
      }
    )
  }
}
