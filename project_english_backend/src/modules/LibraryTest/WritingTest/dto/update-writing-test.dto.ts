import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString, IsBoolean, IsDecimal, IsUUID } from 'class-validator';
import { CreateWritingTestDto } from './create-writing-test.dto';

export class UpdateWritingTestDto extends PartialType(CreateWritingTestDto) {
  @IsOptional()
  @IsUUID()
  wtringId?: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsString()
  duration?: string;

  @IsOptional()
  @IsBoolean()
  IsAchieve?: boolean;

  @IsOptional()
  @IsDecimal()
  score?: number;
}
