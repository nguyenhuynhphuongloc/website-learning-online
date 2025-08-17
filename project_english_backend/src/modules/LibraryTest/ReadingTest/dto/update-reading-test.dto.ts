import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsBoolean, IsDecimal, IsUUID, IsString } from 'class-validator';
import { CreateReadingTestDto } from './create-reading-test.dto';

export class UpdateReadingTestDto extends PartialType(CreateReadingTestDto) {
  @IsOptional()
  @IsUUID()
  readingId?: string;

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
