import { IsString, IsNotEmpty, IsArray, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class SectionDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsOptional()
  @IsString()
  imagePath?: string;
}

export class CreateWritingTestDto {

  @IsString()
  title: string;

  @IsOptional()
  @Type(() => SectionDto)
  sections?: SectionDto[];
}
