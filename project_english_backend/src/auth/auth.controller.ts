import { Controller, Request, Post, UseGuards, Get, Body, UseInterceptors, UploadedFiles, ParseFilePipeBuilder, Put, Req, UnauthorizedException, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { Public } from 'src/decorator/custome';
import { CreateAuthDto } from 'src/auth/dto/create-auth.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ChangePasswordDto } from 'src/auth/dto/change.passord.dto';
import { LoginDto } from 'src/auth/dto/login.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ForgotPasswordDto } from 'src/auth/dto/ForgotPassword.dto';
import { RefreshTokenGuard } from 'src/auth/guards/refreshToken.guard';
import { GoogleGuard } from 'src/auth/guards/google.guard';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private Mailservice: MailerService) { }


  @Post('sign-up')
  @Public() //Public() là một custom decorator để đánh dấu route không cần xác thực như đăng nhập
  Register(@Body() registerDto: CreateAuthDto) {
    return this.authService.Register(registerDto)
  }

  @Post('login')
  async signIn(@Body() credentials: LoginDto, @Res({ passthrough: true }) res: Response) {
    return this.authService.login(credentials, res);
  }

  @Post('logout')
  async LogOut(@Body('accessToken') accessToken: string) {
    return this.authService.LogOut(accessToken);
  }

  @UseGuards(RefreshTokenGuard)
  @Post('refreshToken')
  async RefreshToken(@Request() req) {
    return await this.authService.refreshToken(req.id, req.username,req.role);
  }

  @Post('forgot-password')
  async ForgotPassword(@Body() forgotpassword: ForgotPasswordDto) {
    return await this.authService.forgotPassword(forgotpassword.email)
  }


  @Put('change-password')
  @UseGuards(AuthGuard)
  async changePassword(@Body() changePasswordDto: ChangePasswordDto, @Request() req) {

    console.log(req.user); // Kiểm tra user có tồn tại không
    const userId = req.user.sub

    return await this.authService.changePassword(
      userId, // Đảm bảo token có user.id
      changePasswordDto.oldPassword,
      changePasswordDto.newPassword,
    );
  }






  @Get('mail')
  @Public()
  async testMail() {
    try {
      await this.Mailservice.sendMail({
        to: 'nguyenhuynhphuongloc@gmail.com', // list of receivers
        subject: 'Testing Nest MailerModule ✔', // Subject line
        text: 'Welcome', // plaintext body
        html: '<b>Hello World</b>', // HTML body content
      });
      console.log('Email sent successfully!');
    } catch (error) {
      console.error('Error sending email:', error.message);
    }
  }

  @Post('uploadproduct')
  @UseInterceptors(FilesInterceptor('files', 3))
  create(@Body() body, @UploadedFiles(
    new ParseFilePipeBuilder()
      .addFileTypeValidator({
        fileType: /^(image\/(jpg|jpeg|png|svg|svg\+xml))$/,
      })
      .addMaxSizeValidator({
        maxSize: 10_000_000,
      })
      .build(),
  ) files: Array<Express.Multer.File>,) {
    console.log("uppload product");
    console.log(files);
    this.authService.UploadFile(files);
  }

  @UseGuards(GoogleGuard)
  @Get('google/login')
  async googleLogin() { }

  @UseGuards(GoogleGuard)
  @Get('google/callback')
  async googleCallback(@Req() req, @Res() res: Response) {

    const user = req.user; // req.user được lấy từ validate của GoogleStrategy

    const  accessToken  = await this.authService.generateAccesstoken(user.id)


    const redirectUrl = new URL(process.env.FRONTEND_GOOGLE_CALLBACK_URL);

    console.log(redirectUrl)

    redirectUrl.searchParams.set('accessToken', accessToken);
    redirectUrl.searchParams.set('refreshToken', user.hashedRefreshToken);
    redirectUrl.searchParams.set('userId', user._id.toString());
    redirectUrl.searchParams.set('name', `${user.firstName} ${user.lastName}`);
    redirectUrl.searchParams.set('role', user.role);

    return res.redirect(redirectUrl.toString());

  }

  @Get("generateToken")
  @Public()
  async Generate(@Body() body: { userId: string }) {
    return await this.authService.generateToken(body.userId);
  }

}
