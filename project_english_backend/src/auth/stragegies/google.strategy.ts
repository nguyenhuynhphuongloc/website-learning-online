import { Inject, Injectable } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { Strategy } from "passport-google-oauth20";
import { PassportStrategy } from "@nestjs/passport";
import googleOuth from "src/auth/config/google.outh";
import { VerifiedCallback } from "passport-jwt";
import { AuthService } from "src/auth/auth.service";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {

  constructor(
    @Inject(googleOuth.KEY) private googleConfig: ConfigType<typeof googleOuth>,
    private readonly auservice: AuthService,
  ) {
    super({
      clientID: googleConfig.clientId,
      clientSecret: googleConfig.clientSecret,
      callbackURL: googleConfig.callbackUrl,
      passReqToCallback: true,
      scope: ['profile', 'email'],
    });
  }

  async validate(
    req: Request, // ✅ bắt buộc khi dùng passReqToCallback
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifiedCallback
  ) {
    console.log("Google profile:", profile);

    const user = await this.auservice.valiateGoogleLogin(profile);

    console.log("user", user)

    if (!user) {
      return done(new Error("User not found"), false);
    }

    done(null, user); // ✅ phải gọi done()
  }


}