import { IsUUID, IsDate, IsNotEmpty } from 'class-validator';

export class CreateCategoryItemDto {
  @IsNotEmpty()
  @IsUUID()
  categoryId: string;

  @IsNotEmpty()
  @IsDate()
  createdAt: Date;

  @IsNotEmpty()
  @IsDate()
  updatedAt: Date;
}
