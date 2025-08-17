import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsBoolean,
    IsDateString,
    IsMongoId
  } from 'class-validator';
  
  export class CreateAuthDto {
    @IsString()
    @IsNotEmpty({ message: 'username is empty' })
    username: string;
  
    @IsString()
    @IsNotEmpty({ message: 'password is empty' })
    password: string;
  
    @IsOptional()
    @IsEmail({}, { message: 'Invalid email format' })
    email: string | null ;

    @IsOptional()
    @IsString()
    firstName: string | null ;

    @IsOptional()
    @IsString()
    lastName: string | null ;
  
    @IsOptional()
    @IsString()
    avatarUrl: string | null ;
  
    @IsOptional()
    @IsDateString({}, { message: 'dateOfbirth must be a valid ISO 8601 date string' })
    dateOfbirth: string | null ;
  
    @IsOptional()
    @IsString()
    codeId: string | null ;
  
    @IsOptional()
    @IsString()
    gender: string | null ;
  
    @IsOptional()
    @IsString()
    phoneNumber: string | null ;
  
    @IsOptional()
    @IsMongoId({ message: 'roleId must be a valid Mongo ObjectId' })
    role: string | null ;
  
    @IsOptional()
    @IsBoolean()
    active: boolean | null ;
  
    @IsOptional()
    @IsBoolean()
    isVip: boolean | null ;
  
    @IsOptional()
    @IsDateString({}, { message: 'vipExpirationDate must be a valid ISO 8601 date string' })
    vipExpirationDate: string | null ;
  }
  