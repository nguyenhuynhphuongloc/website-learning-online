import { IsNotEmpty, Min, Max, IsDate, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateResultReadingDto {

  @IsNotEmpty()
  testId: string;

  @IsOptional()
  userId: string;

  @IsNotEmpty()
  @Max(40)
  numberOfCorrectAnswers: number;

  @IsNotEmpty()
  @Min(0)
  @Max(9)
  score: number;

  @IsDate()
  @Type(() => Date)
  completedAt?: Date;

}
