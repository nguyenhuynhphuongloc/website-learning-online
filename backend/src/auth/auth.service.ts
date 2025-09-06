import { BadRequestException, Body, Inject, Injectable, InternalServerErrorException, Logger, ParseFilePipeBuilder, Post, Res, UnauthorizedException, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { Response } from 'express';
import { CreateAuthDto } from './dto/create-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { comparePassword, hassPassword } from 'src/helpers/util';
import path from 'path';
import * as fs from 'fs';
import { UserService } from 'src/modules/User/user.service';
import { v4 as uuidv4 } from 'uuid';
import { RefreshToken } from 'src/schemas/RefreshToken.schemas';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { error } from 'console';
import { User } from 'src/schemas/User.schemas';
import { LoginDto } from 'src/auth/dto/login.dto';
import { MailService } from 'src/mails/mail.service';
import { ResetToken } from 'src/schemas/ResetToken.schemas';
import { AuthPayload } from 'src/auth/types/auth-jwtPayload';
import refreshjwtConfig from 'src/auth/config/refreshjwt.config';
import { ConfigType } from '@nestjs/config';
import jwtConfig from 'src/auth/config/jwt.config';
import { hash, verify } from 'argon2';

@Injectable()
export class AuthService {


  constructor(

    private readonly userService: UserService,

    private jwtService: JwtService,

    @InjectModel(User.name) private userModel: Model<User>,

    @InjectModel(RefreshToken.name) private refreshTokenModel: Model<RefreshToken>,

    @InjectModel(ResetToken.name) private resetTokenModel: Model<ResetToken>,

    @Inject(refreshjwtConfig.KEY) private refreshJwtConfig: ConfigType<typeof refreshjwtConfig>,

    @Inject(jwtConfig.KEY) private jwtConfigrulation: ConfigType<typeof jwtConfig>,

    private mailService: MailService

  ) { }

  async verifyUser(username: string, password: string): Promise<any> {

    try {

      const user = await this.userService.getUser({ username })



      const isVailidPassword = await comparePassword(password, user.password)



      if (!isVailidPassword) throw new UnauthorizedException('Invalid password');

      return user != null ? user : null;

    }

    catch {
      Logger.error("Error in verifyUser:", error);

      throw new UnauthorizedException("error in Verify AuthService")

    }


  }

  async login(@Body() credentials: LoginDto, @Res({ passthrough: true }) res: Response) {

    const { email, password } = credentials;

    const user = await this.userModel.findOne({ email });

    const { accessToken, refreshToken } = await this.generateToken(user.id)

    const hashedRefreshToken = await hash(refreshToken)

    await this.userService.updateHashedRefeshToken(user.id, hashedRefreshToken)

    if (!user?._id) throw new Error("User ID không tồn tại");

    const passwordMatch = await comparePassword(password, user.password);

    if (!passwordMatch) throw new Error("Mật khẩu sai");



    return {
      user: {
        id: user._id.toString(),
        name: user.username || null,
        role: user.role
      },
      access_token: accessToken,
      refresh_token: refreshToken,
    };

  }

  async generateAccesstoken(userId: string) {

    const payload = { sub: userId };

    const accessToken = await this.jwtService.sign(payload, this.jwtConfigrulation);

    return accessToken;

  }


  async generateRefreshToken(userId: string) {

    const payload = { sub: userId };

    const refressToken = await this.jwtService.sign(payload, this.refreshJwtConfig);

    return refressToken;

  }

  async storeRefreshToken(token: string, userId) {

    const expiryDate = new Date()

    expiryDate.setDate(expiryDate.getDate() + 3);

    await this.refreshTokenModel.create({ token: token, userId: userId, expiryDate })

  }

  async forgotPassword(email: string) {

    const user = await this.userModel.findOne({ email })

    const expiryDate = new Date()

    expiryDate.setHours(expiryDate.getHours() + 1)

    if (user) {

      const resetToken = uuidv4()

      await this.resetTokenModel.create({

        token: resetToken,

        userId: user._id,

        expiryDate: expiryDate

      }
      )

      this.mailService.sendPasswordResetEmail(email, resetToken)

    }
  }

  async LogOut(userId: string) {
    return await this.userService.updateHashedRefeshToken(userId, null)
  }

  async resetPassword(newPassword: string, resetToken: string) {

    const token = await this.resetTokenModel.findOne({
      token: resetToken,
      expiryDate: { $gte: new Date() }
    });

    if (!token) throw new UnauthorizedException("Invalidl link");

    const user = await this.userModel.findById(token.userId)

    if (!user) throw new InternalServerErrorException();

    user.password = await hassPassword(newPassword)

    await user.save()
  }

  async changePassword(userId, oldPassword, newPassword) {

    console.log(userId)
    const user = await this.userModel.findById(userId)
    console.log("currentuser", user)

    if (!user) {
      throw Error("User not found")
    }

    const passwrodMatch = await comparePassword(oldPassword, user.password)

    if (!passwrodMatch) throw Error("Wrong credentitals");

    const newHashPassword = await hassPassword(newPassword)

    user.password = newHashPassword

    await user.save();

    return { message: "Password updated successfully" };

  }


  async Register(registerDto: CreateAuthDto) {
    return this.userService.Register(registerDto)
  }

  async UploadFile(files: Express.Multer.File[]) {

    let newProduct;

    const subFolderDir = `products/${newProduct.id.toString()}`;

    console.log(subFolderDir)

    const folderDir = path.join('public', subFolderDir);

    console.log(folderDir)

    if (!fs.existsSync(folderDir)) {

      fs.mkdirSync(folderDir, { recursive: true });

    }

    if (!Array.isArray(files)) {
      throw new Error('Files should be an array');
    }

    const productImages = files.map((file) => {

      const filePath = `${folderDir}/${file.originalname}`;

      fs.writeFileSync(filePath, file.buffer);

      return {

        imageUrl: `http://localhost:3000/${subFolderDir}/${file.originalname}`,

        productId: newProduct.id,

      };
    });
  }


  async validateJwtUser(userId: string) {
    return this.userModel.findById(userId);
  }

  async generateToken(userId: string) {

    const payload: AuthPayload = { sub: userId }

    const [accessToken, refreshToken] = await Promise.all([

      this.jwtService.signAsync(payload, this.jwtConfigrulation),

      this.jwtService.signAsync(payload, this.refreshJwtConfig),

    ]);

    return {

      accessToken,

      refreshToken

    }
  }


  async valiateGoogleLogin(profile: any) {

    const email = profile.emails?.[0]?.value;

    if (!email) {
      throw new Error('Email not found in Google profile');
    }

    let user = await this.userModel.findOne({ email });

    const customId = new mongoose.Types.ObjectId();

    const refreshToken = await this.generateRefreshToken(customId.toString())

    if (user) {
      return user;
    }


    user = new this.userModel({
      email,
      firstName: profile.name?.givenName || '',
      hashedRefreshToken: refreshToken,
      lastName: profile.name?.familyName || '',
      avatarUrl: profile.photos?.[0]?.value || '',
      provider: 'google',
      username: profile.id,
      password: "321321",
      active: true,
    });

    await user.save();

    console.log("Created Google user:", user);

    return user;

  }

  async validateRefreshToken(userId: string, refreshToken: string) {

    const user = await this.userModel.findById(userId);

    if (!user) throw new UnauthorizedException("User not found");

    const refreshTokenMatch = await verify(user.hashedRefreshToken, refreshToken)

    if (!refreshTokenMatch) throw new UnauthorizedException('Invalid Refresh Token')


    const currentuser = { id: user._id, username: user.username };

    return currentuser;
  }

  async refreshToken(userId: string, username: string, role: string) {

    const { accessToken, refreshToken } = await this.generateToken(userId);

    return {
      id: userId,
      username,
      role:
        accessToken,
      refreshToken,
    }

  }

  async loginGoole(userId: string) {


    const user = await this.userModel.findOne({ userId });

    const { accessToken, refreshToken } = await this.generateToken(user.id)

    const hashedRefreshToken = await hash(refreshToken)

    await this.userService.updateHashedRefeshToken(user.id, hashedRefreshToken)

    if (!user?._id) throw new Error("User ID không tồn tại");


    return {
      user: {
        id: user._id.toString(),
        name: user.username || null,
      },
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }


}
