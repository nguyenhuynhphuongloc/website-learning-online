import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsBoolean, IsDecimal, IsUUID } from 'class-validator';
import { CreateListeningTestDto } from './create-listening-test.dto';

export class UpdateListeningTestDto extends PartialType(CreateListeningTestDto) {
  @IsOptional()
  @IsUUID()
  listeningId?: string;

  @IsOptional()
  duration?: string;

  @IsOptional()
  @IsBoolean()
  IsAchieve?: boolean;

  @IsOptional()
  @IsDecimal()
  score?: number;
}
