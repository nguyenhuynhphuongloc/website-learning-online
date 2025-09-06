import { IsUUID, IsArray, ValidateNested, IsNotEmpty, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';
import { ItemDto } from './item.dto';

export class OrderDto {

  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsDateString()
  @IsNotEmpty()
  orderDate: Date;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ItemDto)
  items: ItemDto[];
  
}
