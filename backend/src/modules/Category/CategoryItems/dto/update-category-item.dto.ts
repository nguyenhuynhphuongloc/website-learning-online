import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsUUID, IsDate } from 'class-validator';
import { CreateCategoryItemDto } from './create-category-item.dto';

export class UpdateCategoryItemDto extends PartialType(CreateCategoryItemDto) {
  @IsOptional()
  @IsUUID()
  categoryId?: string;

  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @IsOptional()
  @IsDate()
  updatedAt?: Date;
}
