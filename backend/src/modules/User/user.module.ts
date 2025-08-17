import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchemal } from 'src/schemas/User.schemas';
import { MailService } from 'src/mails/mail.service';
import { UserControler } from 'src/modules/User/user.controller';
import { UserService } from 'src/modules/User/user.service';
import { CacheModule } from '@nestjs/cache-manager';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { AuthModule } from 'src/auth/auth.module';
import { BlacklistModule } from 'src/modules/Blacklist/blacklist.module';
import { WalletModule } from 'src/modules/Walet/wallet.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchemal
      },
    ]),
    WalletModule,
    forwardRef(() => AuthModule),
    forwardRef(() => BlacklistModule),

    CacheModule.register()
  ],
  controllers: [UserControler],
  providers: [UserService, MailService, AuthGuard],
  exports: [UserService, AuthGuard],
})

export class UserModule { }
