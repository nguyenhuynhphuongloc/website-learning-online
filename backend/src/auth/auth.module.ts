import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from 'src/modules/User/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RefreshToken, RefreshTokenSchema } from 'src/schemas/RefreshToken.schemas';
import { User, UserSchemal } from 'src/schemas/User.schemas';
import { PassportModule } from '@nestjs/passport';
import { MailService } from 'src/mails/mail.service';
import { ResetToken, ResetTokenSchema } from 'src/schemas/ResetToken.schemas'
import { BlacklistService } from 'src/modules/Blacklist/blacklist.service';
import { BlacklistModule } from 'src/modules/Blacklist/blacklist.module';
import { Blacklist, BlacklistSchemal } from 'src/schemas/Blacklist.schemas';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { WalletModule } from 'src/modules/Walet/wallet.module';
import { GoogleStrategy } from 'src/auth/stragegies/google.strategy';
import googleOuth from 'src/auth/config/google.outh';
import jwtConfig from 'src/auth/config/jwt.config';
import refreshJwtConfig from 'src/auth/config/refreshJwt.config';
import { JwtStrategy } from 'src/auth/stragegies/jwt.strategy';

@Module({
  imports: [
    UserModule,
    BlacklistModule,
    forwardRef(() => WalletModule),

    PassportModule.register({ defaultStrategy: 'jwt' }),

    MongooseModule.forFeature([
      { name: User.name, schema: UserSchemal },
      { name: RefreshToken.name, schema: RefreshTokenSchema },
      { name: ResetToken.name, schema: ResetTokenSchema },
      { name: Blacklist.name, schema: BlacklistSchemal },
    ]),

    // Cấu hình Google OAuth, JWT, Refresh JWT
    ConfigModule.forFeature(googleOuth),
    ConfigModule.forFeature(jwtConfig),
    ConfigModule.forFeature(refreshJwtConfig),

    // ✅ Cấu hình JWT duy nhất (dùng async để lấy từ config service)
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],

  controllers: [AuthController],

  providers: [
    AuthService,
    JwtService,
    MailService,
    BlacklistService,
    AuthGuard,
    GoogleStrategy,
    JwtStrategy,
  ],

  exports: [
    AuthService,
    PassportModule,
    AuthGuard,
    JwtModule,
    MongooseModule,
  ],
})
export class AuthModule {}
