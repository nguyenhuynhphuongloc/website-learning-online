import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsUUID, IsDate } from 'class-validator';
import { CreateCategoryDto } from './create-category.dto';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @IsOptional()
  @IsUUID()
  UserId?: string;

  @IsOptional()
  @IsUUID()
  parentId?: string;

  @IsOptional()
  @IsDate()
  createdAt?: Date;
}
