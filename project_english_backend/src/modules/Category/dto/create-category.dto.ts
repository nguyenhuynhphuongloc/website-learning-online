import { IsUUID, IsDate, IsNotEmpty } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsUUID()
  UserId: string;

  @IsNotEmpty()
  @IsUUID()
  parentId: string;

  @IsNotEmpty()
  @IsDate()
  createdAt: Date;
}
