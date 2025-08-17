import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString, IsDate, IsEmail, IsBoolean, IsInt, IsDecimal } from 'class-validator';
import { CreateUserDto } from 'src/modules/User/dto/CreateUser.dto';


export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsString()
  userName?: string;

  @IsOptional()
  @IsString()
  passWord?: string;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsOptional()
  @IsDate()
  DateofBirth?: Date;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  role?: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsBoolean()
  @IsOptional()
  active?: string;


  @IsBoolean()
  @IsOptional()
  isVip?: boolean;


  @IsOptional()
  @IsInt()
  rank?: number;

  @IsOptional()

  @IsString()
  targetscore?: string;

  @IsOptional()
  @IsDecimal()
  previousScore?: number;

  @IsOptional()
  @IsString()
  gender?: string;
}