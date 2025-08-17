import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateWritingResultDto {
  @IsString()
  task1Content: string;

  @IsString()
  task2Content: string;

  @IsString()
  @IsNotEmpty()
  testId: string;

  @IsOptional()
  completedAt?: Date;
}
