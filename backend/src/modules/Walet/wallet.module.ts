import { forwardRef, Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { Wallet, WalletSchemal } from 'src/schemas/Wallet.schemas';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RefreshToken, RefreshTokenSchema } from 'src/schemas/RefreshToken.schemas';
import { BlacklistModule } from 'src/modules/Blacklist/blacklist.module';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    MongooseModule.forFeature([
      {
        name: Wallet.name, schema: WalletSchemal
      },
      {
        name: RefreshToken.name, schema: RefreshTokenSchema
      }
    ]),
    forwardRef(() => BlacklistModule),

  ],


  controllers: [WalletController],
  providers: [WalletService, AuthGuard],
  exports: [WalletService, AuthGuard],
})
export class WalletModule { }
