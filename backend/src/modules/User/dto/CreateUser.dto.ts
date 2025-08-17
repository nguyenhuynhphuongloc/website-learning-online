import { IsString, IsEmail, IsBoolean, IsOptional, IsDate, IsDecimal, IsInt, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  
  @IsNotEmpty()
  @IsString()
  userName: string;

  @IsNotEmpty()
  @IsString()
  passWord: string;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsOptional()
  @IsDate()
  DateofBirth?: Date;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  firstName?: string;

  @IsNotEmpty()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  roleId?: string;

  @IsOptional()
  @IsString()
  telePhone?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsString()
  DisplayCurrency?: string;

  @IsOptional()
  @IsDate()
  Timezone?: Date;

  @IsOptional()
  @IsBoolean()
  HaveScore?: boolean;

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
  @IsDate()
  DoETaken?: Date;

  @IsOptional()
  @IsBoolean()
  Gender?: boolean;
}
