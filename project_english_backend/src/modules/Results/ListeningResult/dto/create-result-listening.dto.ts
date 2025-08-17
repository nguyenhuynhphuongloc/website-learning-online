import { IsNotEmpty, IsUUID, Min, Max, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateResultListeningDto {

  @IsNotEmpty()
  testId: string;

  @IsNotEmpty()
  @Max(40)
  numberOfCorrectAnswers: number;

  @IsNotEmpty()
  @Min(0)
  @Max(9)
  score: number;

  @IsDate()
  @Type(() => Date) // 🔥 RẤT QUAN TRỌNG cho kiểu Date
  completedAt?: Date;

}
