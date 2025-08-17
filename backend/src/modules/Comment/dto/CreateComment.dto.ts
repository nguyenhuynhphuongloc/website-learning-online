import { Type } from "class-transformer";
import { IsArray, IsDate, IsEmail, IsOptional, IsString } from "class-validator";



export class CreateCommentDto {

  @IsString()
  userId: string

  @IsString()
  comment: string

  @IsDate()
  @Type(() => Date) // 🔥 RẤT QUAN TRỌNG cho kiểu Date
  @IsOptional()
  date: Date


  @IsArray()
  reply: Comment[]

}


export class CreateReplyDto {
  @IsString()
  comment: string;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  date?: Date;
}

export interface Comment {
  comment: string; // The content of the comment
  date?: Date; // Optional field for the comment date
}