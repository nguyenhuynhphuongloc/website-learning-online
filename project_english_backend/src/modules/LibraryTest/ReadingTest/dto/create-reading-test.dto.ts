import { IsString, IsNotEmpty, IsArray, ValidateNested, IsOptional, ArrayMinSize, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';

class Section {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Question) // Chuyển đối tượng thành kiểu Question
  questions: Question[];
}

class Question {
  @IsNotEmpty()
  id: number;

  @IsString()
  type: 'multiple-choice' | 'fill-in-the-blank' | 'true-false';

  @IsString()
  @IsNotEmpty()
  question: string;

  @IsOptional()
  @IsArray()
  options?: string[];

  @IsString()
  @IsNotEmpty()
  answer: string;
}

export class CreateReadingTestDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Section)
  section: Section[];
}
