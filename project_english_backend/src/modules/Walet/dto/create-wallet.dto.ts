import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsMongoId } from 'class-validator';

export class CreateWalletDto {
    
  @IsNotEmpty()
  @Type(() => Number) // 👈 tự động convert từ string sang number
  @IsNumber()
  amount: string;

  @IsNotEmpty()
  @IsMongoId() // Đảm bảo đây là ObjectId hợp lệ của MongoDB
  userId: string;
}
